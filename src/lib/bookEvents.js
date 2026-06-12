'use client';

// Booking-funnel GA4 events fired from the parent page now that LocalRent
// renders natively on /book (no iframe -> we own the DOM, the Vuex store, and
// every link click). Replaces the iframe-era visibility black hole: we used
// to see only page_view; now we see dates picked -> filter changed -> car
// opened -> continue -> redirect, so Smart Bidding has a real funnel.
//
// Event taxonomy per REFACTOR-PLAN-no-iframe-book.md lines 102-107:
//   booking_dates_selected      - both pickup & dropoff in store (once/session)
//   booking_filter_changed      - any filter/sort mutation (debounced 500 ms)
//   booking_car_opened          - hash route lands on a #/.../cars/<slug>/?car_id=
//   booking_continue_clicked    - click on a CTA link pointing at localrent.com
//   booking_redirect_to_localrent - the actual navigation, our final touchpoint
//
// booking_redirect_to_localrent is the one to import into Google Ads as the
// primary conversion; it's the strongest pre-purchase intent signal we can
// see client-side without LocalRent's postMessage/postback cooperation.

import { trackEvent } from './analytics';

// Google Ads conversion target for "Booking — clicked to LocalRent".
// KCR has no Google Ads account configured yet, so this is intentionally
// empty: the GA4 funnel events below still fire (they are the value here),
// but no conversion ping is sent (and never to another site's account).
// When KCR gets its own Ads conversion, set it to 'AW-XXXX/yyyy'.
const GOOGLE_ADS_REDIRECT_CONVERSION = '';

function fireGoogleAdsRedirectConversion() {
  if (!GOOGLE_ADS_REDIRECT_CONVERSION) return; // no Ads account wired for KCR
  // transaction_id makes each conversion uniquely identifiable so Google
  // Ads' "Count: One" dedupe works correctly if the same user clicks
  // through twice in the same session (different attempts, both counted).
  trackEvent('conversion', {
    send_to: GOOGLE_ADS_REDIRECT_CONVERSION,
    transaction_id: 'lr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
  });
}

// Shared sink for redirect-detection paths that aren't direct <a> clicks
// (window.open wrapper, Navigation API 'navigate' event). The original
// <a>-click path pre-dates this helper and stays inlined so its event
// payload doesn't gain a `method` field people might depend on in reports.
function fireRedirectIfLocalrent(url, method) {
  if (!url) return;
  if (!/localrent\.com/i.test(String(url))) return;
  trackEvent('booking_redirect_to_localrent', {
    destination: String(url).slice(0, 250),
    method: method,
  });
  fireGoogleAdsRedirectConversion();
}

// Module-scope dedupe set. Survives LR re-mounts within a single page load,
// which is the right behaviour: we want one booking_car_opened per distinct
// car_id even if the user opens, closes, and re-opens the same car.
const FIRED_ONCE = new Set();

function fireOnce(key, name, params) {
  if (FIRED_ONCE.has(key)) return;
  FIRED_ONCE.add(key);
  trackEvent(name, params);
}

// LR's store mutates many times per filter interaction (one tap fans into ~5
// commits as it re-runs the search). Coalesce to one event per 500 ms so
// rapid taps don't blow the GA4 event quota or pollute Smart Bidding signal.
let filterDebounceTimer = null;
let lastFilterPayload = null;
function fireFilterChanged(mutationType, payload) {
  lastFilterPayload = { type: mutationType, value: payload };
  if (filterDebounceTimer) clearTimeout(filterDebounceTimer);
  filterDebounceTimer = setTimeout(() => {
    const p = lastFilterPayload || {};
    trackEvent('booking_filter_changed', {
      filter_type: String(p.type || '').slice(0, 80),
      // payload can be {filter, value} or a primitive; stringify defensively.
      filter_value: (() => {
        try { return String(typeof p.value === 'object' ? JSON.stringify(p.value) : p.value).slice(0, 120); }
        catch { return ''; }
      })(),
    });
    filterDebounceTimer = null;
    lastFilterPayload = null;
  }, 500);
}

// Match a hash like `#/en/montenegro/cars/peugeot-208/?car_id=62045` and
// pull both the slug and the numeric id so GA4 reports show both forms.
function parseCarHash(hash) {
  if (!hash) return null;
  const idMatch = hash.match(/[?&]car_id=(\d+)/);
  if (!idMatch) return null;
  const slugMatch = hash.match(/cars\/([^/?]+)/);
  return { carId: idMatch[1], carSlug: slugMatch ? slugMatch[1] : null };
}

// LR's checkout advances through `b_step=N` on the URL hash (data-routing:on),
// NOT via an <a> click or a navigation off-site — the whole flow stays on
// /book inside LR's Vue app. Observed live: b_step=2 is the booking summary,
// b_step=3 is the card-entry page, and reaching b_step=3 is exactly when LR
// writes the booking into its dashboard. So b_step=3 is our real conversion
// point. Parse the step so the hashchange handler can fire on it the same
// way booking_car_opened already fires on car_id (that path works reliably).
function parseBookStep(hash) {
  if (!hash) return null;
  const m = hash.match(/[?&]b_step=(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// The checkout step at which LR records the booking (card-entry page).
const BOOKING_CONVERSION_STEP = 3;

// Returns a detach function that the caller MUST invoke on unmount, otherwise
// hot-reload / route-change re-mounts double-attach and every event fires twice.
export function attachBookEventListeners(host, store) {
  if (!host || !store || typeof store.subscribe !== 'function') return () => {};

  // Fire booking_dates_selected immediately if dates are ALREADY in the store.
  // This is the common path: LocalRentWidget's date-injection effect commits
  // pickupDate/dropoffDate from the URL params into the store BEFORE we
  // attach this listener, so subscribe() never sees the mutation. Without
  // this initial check we'd miss the event for every deep-linked landing
  // (which is most ad traffic).
  try {
    const fd = store.state && store.state.filtersDate;
    if (fd && fd.pickupDate && fd.dropoffDate) {
      fireOnce('dates', 'booking_dates_selected', {
        pickup_date: fd.pickupDate,
        dropoff_date: fd.dropoffDate,
        pickup_time: fd.pickupTime || null,
        dropoff_time: fd.dropoffTime || null,
      });
    }
  } catch {}

  // 1 & 2: subscribe once to Vuex mutations for dates + filters.
  const unsubscribe = store.subscribe((mutation, state) => {
    // booking_dates_selected — both dates non-null at any point (deduped).
    const fd = state && state.filtersDate;
    if (fd && fd.pickupDate && fd.dropoffDate) {
      fireOnce('dates', 'booking_dates_selected', {
        pickup_date: fd.pickupDate,
        dropoff_date: fd.dropoffDate,
        pickup_time: fd.pickupTime || null,
        dropoff_time: fd.dropoffTime || null,
      });
    }
    // booking_filter_changed — match LR's mutation naming conventions. The
    // regex covers the variants we've seen across LR app versions: setFilter*,
    // SET_FILTERS_*, filters/setX, setSort, setMultiTabs, etc.
    const type = mutation && mutation.type;
    if (type && /filter|sort|class|tabs|gearbox|insurance|deposit|extras/i.test(type)) {
      fireFilterChanged(type, mutation.payload);
    }
  });

  // 3: booking_car_opened — fires when LR's router lands on a car detail.
  // 5 (real path): booking_redirect_to_localrent — fires when the hash reaches
  // b_step=3 (card-entry), the point LR records the booking. This replaces the
  // <a href=localrent.com> assumption below, which never matches because LR's
  // CTA is a <button> and the flow never leaves /book. Deduped per car_id so
  // bouncing between steps (3 -> 2 -> 3) only counts one conversion; a genuine
  // second booking for a different car gets its own fire.
  const onHashChange = () => {
    const hash = window.location.hash || '';
    const parsed = parseCarHash(hash);
    if (parsed) {
      fireOnce('car_' + parsed.carId, 'booking_car_opened', {
        car_id: parsed.carId,
        car_slug: parsed.carSlug,
      });
      const step = parseBookStep(hash);
      if (step !== null && step >= BOOKING_CONVERSION_STEP) {
        fireOnce('redirect_' + parsed.carId, 'booking_redirect_to_localrent', {
          destination: 'localrent.com b_step=' + step,
          car_id: parsed.carId,
          method: 'b_step',
        });
        // fireOnce dedupes the GA4 event but we must guard the Ads conversion
        // separately — call it only on the same first-time edge.
        if (!FIRED_ONCE.has('adsconv_' + parsed.carId)) {
          FIRED_ONCE.add('adsconv_' + parsed.carId);
          fireGoogleAdsRedirectConversion();
        }
      }
    }
  };
  window.addEventListener('hashchange', onHashChange);
  // Fire on mount if the user deep-linked straight to a car detail / step.
  onHashChange();

  // 4 & 5: click on any link inside the LR mount whose href targets
  // localrent.com. LR renders the final "Continue to booking" CTA as an <a>
  // pointing at localrent.com — catching it in capture phase means we fire
  // BEFORE the click completes and the navigation begins.
  const onClick = (e) => {
    let el = e.target;
    let safety = 8; // bail before walking past the host
    while (el && el !== host && safety-- > 0) {
      if (el.tagName === 'A' && el.href && /localrent\.com/i.test(el.href)) {
        const dest = String(el.href).slice(0, 250);
        trackEvent('booking_continue_clicked', { destination: dest });
        trackEvent('booking_redirect_to_localrent', { destination: dest });
        fireGoogleAdsRedirectConversion();
        return;
      }
      el = el.parentElement;
    }
  };
  host.addEventListener('click', onClick, { capture: true });

  // Belt-and-braces: LR may use window.open(...) for the final hand-off on
  // some flows (e.g. mobile in some app versions). Wrap once, restore on
  // detach. Guarded so multiple attach calls don't stack wrappers.
  const origOpen = window.open;
  let openWrappedByUs = false;
  if (!window.open.__kcrWrapped) {
    const wrapped = function (url, ...rest) {
      try {
        if (url && /localrent\.com/i.test(String(url))) {
          trackEvent('booking_redirect_to_localrent', {
            destination: String(url).slice(0, 250),
            method: 'window.open',
          });
          fireGoogleAdsRedirectConversion();
        }
      } catch {}
      return origOpen.apply(window, [url, ...rest]);
    };
    wrapped.__kcrWrapped = true;
    window.open = wrapped;
    openWrappedByUs = true;
  }

  // The real LR hand-off path. After "Continue to payment" the LR widget
  // POSTs to its own API to create the payment record, then does a plain
  // `window.location.href = 'https://www.localrent.com/en/payments/<id>/'`.
  // That bypasses both the <a>-click listener and the window.open wrapper,
  // so the redirect (and the Google Ads conversion ping) silently never
  // fire. Confirmed in DevTools: no googleadservices.com/pagead/conversion
  // request on hand-off, yet LR's dashboard records the booking.
  //
  // Monkey-patching window.location is impossible in modern browsers (its
  // members are configurable: false for cross-origin security). The
  // Navigation API's 'navigate' event is the supported alternative: it
  // fires BEFORE the navigation with event.destination.url, and covers
  // location.href / .assign / .replace / form submits / link clicks /
  // history mutations uniformly. Chrome 102+ / Edge 102+ / Safari 17.4+
  // cover the vast majority of paid traffic; Firefox lacks it as of 2026
  // and those sessions still fall back to the <a>-click + window.open paths.
  const nav = window.navigation;
  let navListener = null;
  if (nav && typeof nav.addEventListener === 'function') {
    navListener = (e) => {
      try {
        const dest = e && e.destination && e.destination.url;
        fireRedirectIfLocalrent(dest, 'navigation.navigate');
      } catch {}
    };
    try { nav.addEventListener('navigate', navListener); }
    catch { navListener = null; }
  }

  // THE actual fix. LR advances its checkout (car detail -> b_step=2 ->
  // b_step=3) by mutating the URL with history.pushState/replaceState, which
  // does NOT fire the 'hashchange' event — so onHashChange above never ran for
  // the step progression, and booking_car_opened/booking_redirect fired 0
  // times despite real bookings. Confirmed live in Firefox (no Navigation API
  // there either, so that listener is a no-op for a big slice of traffic).
  //
  // Universal catch that works in every browser and for every URL-change
  // mechanism: wrap pushState/replaceState to run our check after the URL
  // updates, and also cover back/forward via popstate. onHashChange reads
  // location.hash fresh each call, so it doesn't matter which path triggered
  // it. Dedup in onHashChange (FIRED_ONCE per car_id) means the overlap with
  // the hashchange/navigate listeners can't double-count.
  window.addEventListener('popstate', onHashChange);
  const origPushState = history.pushState;
  const origReplaceState = history.replaceState;
  let historyWrappedByUs = false;
  if (!history.pushState.__kcrWrapped) {
    history.pushState = function (...args) {
      const r = origPushState.apply(this, args);
      try { onHashChange(); } catch {}
      return r;
    };
    history.replaceState = function (...args) {
      const r = origReplaceState.apply(this, args);
      try { onHashChange(); } catch {}
      return r;
    };
    history.pushState.__kcrWrapped = true;
    history.replaceState.__kcrWrapped = true;
    historyWrappedByUs = true;
  }

  return function detach() {
    try { unsubscribe(); } catch {}
    window.removeEventListener('hashchange', onHashChange);
    window.removeEventListener('popstate', onHashChange);
    host.removeEventListener('click', onClick, { capture: true });
    if (openWrappedByUs && window.open && window.open.__kcrWrapped) {
      window.open = origOpen;
    }
    if (navListener && nav) {
      try { nav.removeEventListener('navigate', navListener); } catch {}
    }
    if (historyWrappedByUs && history.pushState.__kcrWrapped) {
      history.pushState = origPushState;
      history.replaceState = origReplaceState;
    }
    if (filterDebounceTimer) { clearTimeout(filterDebounceTimer); filterDebounceTimer = null; }
  };
}
