'use client';
import { useEffect, useRef } from 'react';
import { LOCALRENT_BRAND_CSS } from '@/src/styles/localrentBrandCss';
import { attachBookEventListeners } from '@/src/lib/bookEvents';

// Inject the scoped LR brand CSS once at module load so it's in the DOM
// before LR's app.js mounts. Bypasses Next/Turbopack's CSS pipeline; mirrors
// the runtime injection pattern used inside widget.html.
if (typeof document !== 'undefined' && !document.getElementById('localrent-brand-css')) {
  const tag = document.createElement('style');
  tag.id = 'localrent-brand-css';
  tag.textContent = LOCALRENT_BRAND_CSS;
  document.head.appendChild(tag);
}

// Mounts LocalRent's white-label booking app directly on the page (no iframe).
// LR's script.src injects the full booking UI (search bar, results grid, car
// detail modal, checkout flow) as a child of our host div. Routing happens
// inside LR's Vue app on the parent page's URL hash, so position:sticky on
// LR's .search-cigarette pins natively against the page scroll.
//
// Mirrors the script-mount pattern used by the car-hire-maker cluster
// (tiranacarhire/src/components/LocalRentWidget.tsx) which has been running
// without iframe issues for months.
export default function LocalRentWidget({
  // Defaults match the MCH iframe build (public/widget.html lines 1590-1618).
  cityId = '9',
  country = '133',     // 133 = Montenegro, 202 = Croatia (Dubrovnik)
  lang = 'en',
  gclid = null,        // ad click ID; forwarded into data-marker for offline-conversion attribution
  // Date / time / age forwarded from the URL by BookPageNative. Null
  // when the user arrived without picking on the homepage - widget
  // falls back to LR's default 14-day window in that case.
  pickupDate = null,
  dropoffDate = null,
  pickupTime = '10:00',
  dropoffTime = '10:00',
  // One-way drop-off (when the user picked a different drop-off city
  // than pickup on the homepage v3 widget). Null = same place.
  dropoffCityId = null,
  dropoffCityName = null,
  // Comma-separated LocalRent vendor listing ids - filters the widget
  // to a single model (homepage fleet cards link with ?model=<slug>
  // which BookPageNative resolves via FLEET_SLUG_TO_CAR_IDS). Stamped
  // into the URL hash on mount; LR's router reads it on boot. Null =
  // show all cars.
  carIds = null,
  // Pickup location name (matches the ?location=Tivat query). Used to
  // stamp pc=TIVAT and dc=TIVAT on the URL hash so LR shows the right
  // city pre-selected. Null = let LR use cityId default.
  location = null,
}) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = '';

    // Strip any non-LR hash BEFORE the app boots. With data-routing: on, LR
    // parses window.location.hash on boot expecting routes like
    // `#/en/montenegro/cars/...`. A flat-key hash (`#pickup_date=...`) makes
    // its router render a phantom entity and the car-fetch 404s. Same fix
    // as widget.html lines 1570-1577.
    try {
      const h = window.location.hash;
      if (h && h.length > 1 && !h.startsWith('#/')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {}

    // Pre-write date + pickup/dropoff into the URL hash BEFORE LR mounts.
    // LR's router (`data-routing: on`) reads window.location.hash on init
    // and applies it as filter state. String params (pc, dc, dates) work
    // fine via the hash. car_ids does NOT - LR's server-side API rejects
    // the comma-joined form (`/api/search/cars/?car_ids=X,Y,Z` -> 500); it
    // wants PHP-style array (`car_ids[]=X&car_ids[]=Y`), which LR only
    // emits when state.filtersMap.car_ids is a real JS Array. We commit
    // that array one-shot below after LR's store is ready.
    try {
      const currentHash = window.location.hash;
      const isRoot = !currentHash || currentHash === '#' || currentHash === '#/' || currentHash.startsWith('#/?');
      const hasPrefill = !!(pickupDate || location);
      if (isRoot && hasPrefill) {
        const p = new URLSearchParams();
        if (pickupDate && pickupTime) p.set('pickup_date', `${pickupDate}T${pickupTime}`);
        if (dropoffDate && dropoffTime) p.set('dropoff_date', `${dropoffDate}T${dropoffTime}`);
        if (location) {
          const pc = String(location).toUpperCase();
          p.set('pc', pc);
          p.set('dc', dropoffCityName ? String(dropoffCityName).toUpperCase() : pc);
        }
        const next = window.location.pathname + window.location.search + '#/?' + p.toString();
        history.replaceState(null, '', next);
      }
    } catch {}

    const s = document.createElement('script');
    s.src = 'https://static.localrent.com/booking/v2/wl/app.js';
    s.async = true;
    s.setAttribute('data-mrc-wl', 'true');
    s.setAttribute('data-affiliate', '14905');
    // `data-marker` is what LR sends to Google Ads offline-conversion. The
    // value MUST match the format the iframe build uses so existing campaign
    // attribution does not break on cutover.
    s.setAttribute('data-marker', 'kch_' + lang + (gclid ? '_' + gclid : ''));
    s.setAttribute('data-country', String(country));
    s.setAttribute('data-city', String(cityId));
    s.setAttribute('data-routing', 'on');
    s.setAttribute('data-zindex', '100');
    s.setAttribute('data-lang', lang);
    // Forward dates / times via data-* aliases (LR's app.js looks at
    // varying names across versions - pile them all on; whichever it
    // recognises wins). Same set as widget.html lines 2219-2232.
    if (pickupDate) {
      s.setAttribute('data-pickup-date', pickupDate);
      s.setAttribute('data-date-from', pickupDate);
      s.setAttribute('data-pickupdate', pickupDate);
      s.setAttribute('data-pickup_date', pickupDate);
      s.setAttribute('data-time-from', pickupTime);
    }
    if (dropoffDate) {
      s.setAttribute('data-dropoff-date', dropoffDate);
      s.setAttribute('data-date-to', dropoffDate);
      s.setAttribute('data-dropoffdate', dropoffDate);
      s.setAttribute('data-dropoff_date', dropoffDate);
      s.setAttribute('data-time-to', dropoffTime);
    }
    host.appendChild(s);

    // Vuex store injection: LR's app reads from a Vue store after mount,
    // and the data-* attributes alone don't always commit on first boot.
    // Poll for the Vue instance and commit dates via every mutation name
    // we've ever seen LR use - same belt-and-braces approach as the
    // iframe build (widget.html lines 2236-2276).
    let storeInjectInterval = null;
    if (pickupDate && dropoffDate) {
      let attempts = 0;
      let confirmedAttempts = 0;
      storeInjectInterval = setInterval(() => {
        attempts++;
        // Hard stop at 10 seconds total.
        if (attempts > 200) { clearInterval(storeInjectInterval); return; }
        let vue = null;
        for (const el of document.querySelectorAll('*')) {
          if (el.__vue__ && el.__vue__.$store) { vue = el.__vue__; break; }
        }
        if (!vue) return;
        const store = vue.$store;
        const state = store.state;
        if (state.filtersDate) {
          state.filtersDate.pickupDate = pickupDate;
          state.filtersDate.dropoffDate = dropoffDate;
          state.filtersDate.pickupTime = pickupTime;
          state.filtersDate.dropoffTime = dropoffTime;
        }
        if (state.calendar) {
          state.calendar.defaultPickup = pickupDate;
          state.calendar.defaultDropoff = dropoffDate;
        }
        try { store.commit('setSelectedDates', true); } catch (e) {}
        try { store.commit('SET_FILTERS_DATE', { pickupDate, dropoffDate }); } catch (e) {}
        try { store.commit('setFiltersDate', { pickupDate, dropoffDate }); } catch (e) {}
        try { store.commit('filters/setDate', { pickupDate, dropoffDate }); } catch (e) {}
        try { store.commit('setPickupTime', pickupTime); } catch (e) {}
        try { store.commit('setDropoffTime', dropoffTime); } catch (e) {}
        // Also push directly into the calendar component so the visible
        // cigarette label updates on first paint.
        let calEl = document.querySelector('.search-cigarette__calendar');
        while (calEl) {
          const v = calEl.__vue__;
          if (v && v.$data && 'dates' in v.$data) {
            v.$set(v.$data, 'dates', [pickupDate, dropoffDate]);
            break;
          }
          calEl = calEl.parentElement;
        }
        try { store.dispatch('fetchCars'); } catch (e) {}
        try { store.dispatch('search/fetchCars'); } catch (e) {}
        // Stop only when the state has STAYED at our values across N
        // consecutive ticks. LR finishes booting and writes its own
        // defaults late, so a single successful write isn't enough -
        // we have to outlast LR's last default-write. 8 ticks = 400ms
        // of consecutive parity before we let go.
        if (
          state.filtersDate &&
          state.filtersDate.pickupDate === pickupDate &&
          state.filtersDate.dropoffDate === dropoffDate
        ) {
          confirmedAttempts++;
          if (confirmedAttempts >= 8) {
            clearInterval(storeInjectInterval);
          }
        } else {
          confirmedAttempts = 0;
        }
      }, 50);
    }

    // Single-model car_ids filter: ONE-SHOT Vuex Array commit, no polling.
    // LR's API requires car_ids in PHP-array form (`car_ids[]=X&car_ids[]=Y`),
    // which LR only serialises that way when state.filtersMap.car_ids is a
    // real JS Array. Pass a string CSV in any other form (URL hash, data-*
    // attribute, plain `car_ids=X,Y,Z`) and LR's app builds a CSV request,
    // which the server 500s on.
    //
    // Strategy: poll at 100ms intervals JUST until filtersDict.car_ids is
    // registered (i.e. LR's store is initialised), commit the Array ONCE,
    // stop. No re-apply loop, no fetchCars spam, no self-healing - one
    // commit is enough because LR's own router/state pipeline takes over
    // from there. Max 50 attempts (5 seconds) as a safety hard-stop.
    let carIdsCommitInterval = null;
    if (carIds) {
      const carIdsList = String(carIds).split(',').map(s => s.trim()).filter(x => /^\d+$/.test(x));
      if (carIdsList.length > 0) {
        let ciAttempts = 0;
        carIdsCommitInterval = setInterval(() => {
          ciAttempts++;
          if (ciAttempts > 50) { clearInterval(carIdsCommitInterval); return; }
          let vueC = null;
          for (const elC of document.querySelectorAll('*')) {
            if (elC.__vue__ && elC.__vue__.$store) { vueC = elC.__vue__; break; }
          }
          if (!vueC) return;
          const storeC = vueC.$store;
          if (!storeC.state.filtersDict || !storeC.state.filtersDict.car_ids) return;
          // Single commit. Stop.
          try { storeC.commit('setFiltersMapValue', { key: 'car_ids', value: carIdsList }); } catch (e) {}
          try { storeC.commit('applyFiltersMap', { path: 'car_ids', value: carIdsList }); } catch (e) {}
          clearInterval(carIdsCommitInterval);
        }, 100);
      }
    }

    // Drop-off city pre-fill (one-way bookings). Port of the iframe
    // build's logic at widget.html line 2095-2200. LR's WL app mirrors
    // pickup -> dropoff by default ("Same place"); to differ, we need
    // to flip the same-location toggle off AND commit the dropoff
    // city via a chain of Vuex mutations.
    let dropoffInjectInterval = null;
    if (dropoffCityId && /^\d+$/.test(String(dropoffCityId)) && dropoffCityName) {
      const dcVal = parseInt(dropoffCityId, 10);
      const dcName = String(dropoffCityName).toUpperCase();
      let dcAttempts = 0;
      dropoffInjectInterval = setInterval(() => {
        dcAttempts++;
        if (dcAttempts > 400) { clearInterval(dropoffInjectInterval); return; }
        let vueD = null;
        for (const elD of document.querySelectorAll('*')) {
          if (elD.__vue__ && elD.__vue__.$store) { vueD = elD.__vue__; break; }
        }
        if (!vueD) return;
        const storeD = vueD.$store;
        // 1. Break the same-location mirror.
        try { storeD.commit('setIsSameLocationCheckbox', false); } catch (e) {}
        // 2. Set the dropoff city name (visible label fields).
        try { storeD.commit('setDropoffCityName', dcName); } catch (e) {}
        try { storeD.commit('setSelectedDropoffCity', { id: dcVal, name: dcName }); } catch (e) {}
        // 3. Stage in filtersMap.
        try { storeD.commit('setFiltersMapValue', { key: 'dropoff_city_id', value: dcVal }); } catch (e) {}
        try { storeD.commit('setFiltersMapValue', { key: 'dc', value: dcName }); } catch (e) {}
        // 4. Apply staged -> active.
        try { storeD.commit('applyFiltersMap', { path: 'dropoff_city_id', value: dcVal }); } catch (e) {}
        try { storeD.commit('applyFiltersMap', { path: 'dc', value: dcName }); } catch (e) {}
        // 5. Direct override on the active filters object - wins over
        // the router auto-default that mirrors pickup -> dropoff.
        try {
          const sNow = storeD.state || {};
          if (sNow.filters) {
            const nextFilters = Object.assign({}, sNow.filters, {
              dc: dcName, dropoff_city_id: dcVal,
            });
            storeD.commit('setFilters', nextFilters);
          }
        } catch (e) {}
        // 6. Refetch cars so the listing reflects the new pair.
        try { storeD.dispatch('fetchCars'); } catch (e) {}
        // 7. The visible city-picker has its own local Vue $data that
        // drives the input text ("Same place" by default). The Vuex
        // store doesn't reach it - mutate the component instance
        // directly. Without this, the URL + filters say Budva but
        // the visible label keeps saying "Same place".
        try {
          const cityPickerEl = document.querySelector('.city-picker');
          if (cityPickerEl) {
            let cp = null;
            let walker = cityPickerEl;
            for (let i = 0; i < 12 && walker; i++) {
              if (walker.__vue__) { cp = walker.__vue__; break; }
              walker = walker.parentElement;
            }
            if (cp && cp.$data) {
              // Display name in the input - convert UPPERCASE back to
              // title-case for nicer UI ("BUDVA" -> "Budva").
              const displayName = dcName.charAt(0) + dcName.slice(1).toLowerCase();
              cp.$data.inputTextDropoff = displayName;
              cp.$data.both = false;
              if ('choosing_drop_off_city' in cp.$data) cp.$data.choosing_drop_off_city = true;
            }
          }
        } catch (e) {}
        // Verify the visible input also landed (filters alone aren't
        // enough - the user has to SEE Budva in the dropoff input).
        let inputOk = false;
        try {
          const dropInp = Array.from(document.querySelectorAll('input')).find(el =>
            el.value && el.value !== 'Same place' && el.parentElement && el.parentElement.className === 'settings__choice'
          );
          inputOk = !!dropInp;
        } catch (e) {}
        const sCheck = storeD.state || {};
        if (sCheck.filters && sCheck.filters.dc === dcName && sCheck.filters.dropoff_city_id === dcVal && inputOk) {
          if (dcAttempts > 20) clearInterval(dropoffInjectInterval);
        }
      }, 80);
    }

    // Parallel poll: find the Vuex store and attach booking-funnel GA event
    // listeners ONCE. Runs independently of the date-injection block above
    // because date-less landings (user arrives without picking dates on the
    // homepage) still need the funnel tracking, and we can't piggyback the
    // date polling that only runs when both dates are present.
    let detachBookEvents = null;
    let eventPollInterval = setInterval(() => {
      let vue = null;
      for (const el of document.querySelectorAll('*')) {
        if (el.__vue__ && el.__vue__.$store) { vue = el.__vue__; break; }
      }
      if (!vue) return;
      detachBookEvents = attachBookEventListeners(host, vue.$store);
      clearInterval(eventPollInterval);
      eventPollInterval = null;
    }, 100);
    // Hard stop after 15 seconds — if the store never appears, LR failed to
    // boot and there's no point keeping the timer alive.
    setTimeout(() => {
      if (eventPollInterval) { clearInterval(eventPollInterval); eventPollInterval = null; }
    }, 15000);

    return () => {
      // Tear down so a route change away from /book and back re-mounts cleanly
      // (LR's app doesn't reliably react to data-attribute changes after boot).
      if (storeInjectInterval) clearInterval(storeInjectInterval);
      if (dropoffInjectInterval) clearInterval(dropoffInjectInterval);
      if (carIdsCommitInterval) clearInterval(carIdsCommitInterval);
      if (eventPollInterval) clearInterval(eventPollInterval);
      if (detachBookEvents) { try { detachBookEvents(); } catch {} }
      host.innerHTML = '';
    };
    // Re-mount whenever any of these change so LR boots with the right values.
  }, [cityId, country, lang, gclid, pickupDate, dropoffDate, pickupTime, dropoffTime, dropoffCityId, dropoffCityName, carIds, location]);

  // .mrcwhitelabel is LR's own root class on the mounted app. All scoped CSS
  // overrides in src/styles/localrent-brand.css target this class, so wrapping
  // the host div with it both (a) lets our rules win and (b) prevents any LR
  // rule from leaking past this boundary.
  return <div ref={hostRef} className="mrcwhitelabel" style={{ minHeight: '600px' }} />;
}
