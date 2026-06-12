// LocalRent brand-color overrides for the no-iframe /book build.
//
// Deliberately MINIMAL. We do NOT port any of the iframe build's structural
// overrides (pinned-popular position rules, mobile cigarette grid layouts,
// trigger column spans, forced pill heights, hide_search toggles). Those
// rules only exist to compensate for behaviour that the iframe boundary
// created or that pinFix forced. On the parent page LR's own CSS handles:
//   - position: sticky on the cigarette (no pinFix needed)
//   - mobile compact bar layout
//   - chip strip sizing
//   - desktop 3-column grid
// All of which work natively when LR is mounted on the page.
//
// This file only changes the brand PALETTE: replace LR's green accents with
// the site navy (rgb(5, 32, 60), same dark surface as the hero/nav), white
// the Filters button on the navy cigarette, recolour the calendar selection,
// swap stickers. Every rule is scoped to .mrcwhitelabel.
//
// Injected at runtime by LocalRentWidget.jsx so the rules are in the head
// before LR's app.js boots.

export const LOCALRENT_BRAND_CSS = `
  /* Cigarette navy bar */
  .mrcwhitelabel .search-cigarette,
  .mrcwhitelabel .search-cigarette__wrap,
  .mrcwhitelabel .search-cigarette__row,
  .mrcwhitelabel .search-cigarette__pinned,
  .mrcwhitelabel [class*="search-cigarette__pinned"] {
    background: rgb(5, 32, 60) !important;
  }
  /* LR ships id-scoped selectors (#mrc_wl_xxxx ...) at higher specificity;
     chain the class to outrank them */
  .mrcwhitelabel [id^="mrc_wl_"] .search-cigarette,
  .mrcwhitelabel [id^="mrc_wl_"] .search-cigarette__wrap,
  .mrcwhitelabel [id^="mrc_wl_"] .search-cigarette__row,
  .mrcwhitelabel [id^="mrc_wl_"] .search-cigarette__pinned {
    background-color: rgb(5, 32, 60) !important;
  }

  /* All form-field pills white on the navy cigarette: Pick-up / Drop-off
     city pill, Dates pill (calendar), Specify location, Filters. Each one
     gets the same white-bg + navy-text + rounded-corners treatment so
     they read as a consistent set of inputs across the row. */
  .mrcwhitelabel .search-filters,
  .mrcwhitelabel .search-filters__wrap,
  .mrcwhitelabel .search-cigarette__filters,
  .mrcwhitelabel .search-cigarette__city,
  .mrcwhitelabel .city-picker,
  .mrcwhitelabel .city-picker__wrap,
  .mrcwhitelabel .search-cigarette__calendar,
  .mrcwhitelabel .search-calendar,
  .mrcwhitelabel .search-calendar__trigger,
  .mrcwhitelabel .search-cigarette__place-time,
  .mrcwhitelabel .search-place-time,
  .mrcwhitelabel .search-placeholder,
  .mrcwhitelabel .search-placeholder__date-time,
  .mrcwhitelabel .search-placeholder__places {
    background-color: #ffffff !important;
    color: rgb(5, 32, 60) !important;
    border-radius: 8px !important;
  }
  .mrcwhitelabel .search-filters,
  .mrcwhitelabel .search-cigarette__filters {
    border-color: #ffffff !important;
  }
  .mrcwhitelabel .search-cigarette__filters { overflow: hidden !important; }
  /* Recolour the Filters button's own icon (sliders/chevron) to navy so
     it matches the navy "Filters" label on the white pill. Scoped to the
     cigarette button ONLY - was previously also matching .search-filters
     (the entire filters PANEL), which force-filled every brand-logo SVG
     inside the brand picker to navy ("Car brand" appeared as solid navy
     blobs instead of Audi rings / Toyota oval / etc.). */
  .mrcwhitelabel .search-cigarette__filters > svg *,
  .mrcwhitelabel .search-cigarette__filters > button svg * {
    stroke: rgb(5, 32, 60) !important;
    fill: rgb(5, 32, 60) !important;
  }

  /* Date pill text: match the Filters button colour exactly. LR ships
     .date-range__days at a lighter grey by default which reads
     mismatched next to the dark Filters label on the same row. */
  .mrcwhitelabel .date-range__date,
  .mrcwhitelabel .date-range__days,
  .mrcwhitelabel .date-range__dash,
  .mrcwhitelabel .date-range__time {
    color: rgb(5, 32, 60) !important;
  }
  /* LR's small separator dots between date / time ship as
     rgba(255,255,255,0.8) - invisible on the white pill. Force navy. */
  .mrcwhitelabel .date-range__dot {
    background-color: rgb(5, 32, 60) !important;
    color: rgb(5, 32, 60) !important;
  }

  /* Active-filter count badge on Filters button */
  .mrcwhitelabel .search-filters__count,
  .mrcwhitelabel [class*="search-filters__count"],
  .mrcwhitelabel [class*="filters__counter"],
  .mrcwhitelabel [class*="filter-count"] {
    background-color: rgb(5, 32, 60) !important;
    color: #ffffff !important;
  }

  /* Primary buttons (View, Continue) -> brand blue gradient. Same
     gradient as the homepage Find button, so the brand-blue lineage is
     consistent across the entire conversion funnel (search -> car cards
     -> checkout). */
  .mrcwhitelabel .button.appearance-default,
  .mrcwhitelabel .vehicle-card-footer__view,
  .mrcwhitelabel .search__button-more,
  .mrcwhitelabel [class*="button-primary"] {
    background: linear-gradient(180deg, rgb(7, 119, 240) 0%, rgb(0, 88, 207) 100%) !important;
    border-color: rgb(0, 88, 207) !important;
    color: #ffffff !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18) !important;
  }
  .mrcwhitelabel .button.appearance-default:hover,
  .mrcwhitelabel .vehicle-card-footer__view:hover,
  .mrcwhitelabel .search__button-more:hover,
  .mrcwhitelabel [class*="button-primary"]:hover {
    filter: brightness(1.06) !important;
  }

  /* Calendar (date picker) green -> navy. color-scheme:only light keeps
     Firefox's forced-dark-mode from auto-inverting the calendar pop-up
     on mobile, which was bleaching the selected dates' navy text into
     near-unreadable grey against the white calendar bg. */
  .mrcwhitelabel,
  .mrcwhitelabel .calendar,
  .mrcwhitelabel .calendar-popup,
  .mrcwhitelabel [class*="calendar"],
  .mrcwhitelabel [class*="datepicker"],
  .mrcwhitelabel .search-cigarette__calendar,
  .mrcwhitelabel .date-range {
    color-scheme: only light !important;
  }
  .mrcwhitelabel .calendar-day.calendar-highlighted {
    background: rgba(5, 32, 60, 0.12) !important;
    color: rgb(5, 32, 60) !important;
  }
  .mrcwhitelabel .calendar-day.calendar-selected {
    background: rgb(5, 32, 60) !important;
    color: #ffffff !important;
  }
  /* Belt-and-braces: defensively force the navy-on-white pair on every
     selected-date class LR ships across white-label + v3 widget code
     paths. Covers .month-date.isSelected (v3), .calendar-day-selected
     (older WL), .day--selected (newer WL build). */
  .mrcwhitelabel .month-date.isSelected,
  .mrcwhitelabel .calendar-day-selected,
  .mrcwhitelabel .day--selected,
  .mrcwhitelabel [class*="day"][class*="selected"],
  .mrcwhitelabel [class*="date"][class*="selected"] {
    background: rgb(5, 32, 60) !important;
    color: #ffffff !important;
  }
  .mrcwhitelabel input[type="checkbox"],
  .mrcwhitelabel input[type="radio"] { accent-color: rgb(5, 32, 60) !important; }

  /* "Free" insurance / success badges (LR green -> brand blue) */
  .mrcwhitelabel .vehicle-card-insurance__price--free,
  .mrcwhitelabel [class*="price--free"] {
    color: rgb(0, 98, 227) !important;
    border-color: rgb(0, 98, 227) !important;
  }

  /* Low-deposit sticker on car cards. Scoped to .product-sticker so it
     does NOT hit the filter chip with the same class fragment. */
  .mrcwhitelabel .product-sticker--low-deposit,
  .mrcwhitelabel .product-sticker[class*="low-deposit"] {
    background: rgb(5, 32, 60) !important;
    color: #ffffff !important;
    border-color: rgb(5, 32, 60) !important;
  }

  /* "Top picks" carousel badges that overlay the car-card image (Low
     deposit / Unlimited mileage / Low ticket / etc). Neutral white pill
     with dark text so they read cleanly over any photo. */
  .mrcwhitelabel .featuring-cool-cars__badge,
  .mrcwhitelabel .featuring-cool-cars__badges > * {
    background-color: #ffffff !important;
    color: #000000 !important;
    border-radius: 999px !important;
    padding: 4px 10px !important;
    font-weight: 600 !important;
    line-height: 1.2 !important;
    box-shadow: none !important;
  }
  /* SVG icons inside the badges - match the text colour. */
  .mrcwhitelabel .featuring-cool-cars__badge svg *,
  .mrcwhitelabel .featuring-cool-cars__badges > * svg * {
    stroke: #000000 !important;
    fill: #000000 !important;
  }

  /* Dashed links inside the widget -> brand blue */
  .mrcwhitelabel .link-dashed,
  .mrcwhitelabel .link-dashed-M,
  .mrcwhitelabel [class*="link-dashed"] {
    color: rgb(0, 98, 227) !important;
    border-color: rgb(0, 98, 227) !important;
  }

  /* No-credit-card / cash-deposit pills -> navy outline */
  .mrcwhitelabel .vehicle-card-info__no-credit-card,
  .mrcwhitelabel [class*="no-credit-card"] {
    border-color: rgb(5, 32, 60) !important;
    color: rgb(5, 32, 60) !important;
  }

  /* Replace LR's hard-coded green color literals across helper classes */
  .mrcwhitelabel [style*="rgb(25, 168, 128)"],
  .mrcwhitelabel [style*="#19a880"],
  .mrcwhitelabel [style*="#27c79a"] {
    border-color: rgb(5, 32, 60) !important;
    color: rgb(5, 32, 60) !important;
    background-color: rgb(5, 32, 60) !important;
  }

  /* Centre LR's app root within the page max-width */
  .mrcwhitelabel {
    max-width: 1172px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Hide the brand nav while the LR car-detail modal is open. The
     .booking__link-close anchor (the X) exists in the DOM ONLY when LR is
     showing a car-detail page, so body:has() reactively toggles this on/off:
       - car-detail open  -> nav hidden, X visible at top of viewport
       - back on /book   -> nav restored automatically (no JS, no observer)
     NOTE: LR renders the close anchor with EITHER .booking__desktop OR
     .booking__mobile depending on viewport, and only one is in the DOM at a
     time. The selector must match the bare .booking__link-close (no variant
     qualifier) - the earlier .booking__desktop-only version worked on desktop
     but on mobile LR emits .booking__mobile, so the rule never fired and the
     nav kept covering the X.
     This site has no .header-stack wrapper (unlike montenegrocarhire): the
     top-bar and nav are siblings rendered by Nav.jsx, so hide both.
     :has() is supported in every browser the site targets (Firefox 121+,
     Chrome 105+, Safari 15.4+). */
  body:has(.booking__link-close) .top-bar,
  body:has(.booking__link-close) .nav {
    display: none !important;
  }

  /* LR's .search-cigarette ships with min-height: 108px. When the
     compact placeholder + chip strip together are shorter than 108px
     (very common on mobile), the leftover space renders as a tall navy
     band below the chips. Let the cigarette shrink to its content. */
  .mrcwhitelabel .search-cigarette {
    min-height: 0 !important;
    height: auto !important;
  }

  /* Nav scrolls away naturally with the page (position:static via the
     on-book-page rule in App.css), so the cigarette pins at viewport
     top:0 once the nav has scrolled past. */
  .mrcwhitelabel .search-cigarette {
    top: 0 !important;
  }
  /* Mobile: the booking form (Pick-up/Drop-off/Rental dates/Specify
     location/Filters) takes a tall vertical layout, so a sticky pin
     covers most of the viewport when the user is past it. Drop sticky
     entirely on mobile so the form scrolls away with the page like the
     nav above it. The car grid below becomes the topmost visible
     content once the user has scrolled past the form. */
  @media (max-width: 768px) {
    .mrcwhitelabel .search-cigarette {
      position: static !important;
    }
  }
`;
