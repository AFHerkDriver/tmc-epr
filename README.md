# Manual EPR — PW2037

Offline-first thrust reference for the **Boeing 757 / PW2037** when the **Thrust Management Computer (TMC) is failed** and you're flying manual EPR. Enter the city pair, pull weather once while you have signal at the gate, and it generates a quick-reference card with per-phase target EPRs that lives entirely offline for the rest of the flight.

**Live:** https://afherkdriver.github.io/tools/tmc-epr/

Installable PWA — open once online, then "Add to Home Screen." After that first load it runs fully offline, airplane mode included.

> ⚠️ **Unofficial crew aid.** EPR values are transcribed from the PW2037 thrust-setting charts and are for cross-reference only. Always confirm against the aircraft **AFM / QRH / FOM** and limitations before use.

---

## What it does

- **Build a flight card** — type departure/arrival ICAO + cruise FL, tap *Fetch weather*, then *Build card*. The card shows a weather snapshot (raw METAR/TAF, computed pressure altitude) and target EPRs for Takeoff, Max Climb, Max Cruise, and Go-Around. Saved to the device; reopens offline.
- **Manual lookup** — the in-flight authority. Pick exact published chart grid values per phase and get the target EPR with chart-accurate bleed/anti-ice corrections, plus a 2×2 bracket of neighbouring cells for cross-check.
- **Full charts** — all four transcribed tables, on board, for direct reading.
- **Print / save PDF** — the card prints clean on white for an EFB or paper backup.

## How the weather pull works (and why it's optional)

Weather comes from **aviationweather.gov** (`/api/data/metar` and `/taf`). That API sends **no CORS headers**, so a browser on GitHub Pages can't read it directly — the app routes the request through a configurable CORS proxy (default `corsproxy.io`, editable under *Weather source → advanced*; blank tries a direct call, which some EFB browsers allow).

The proxy is the **only** external dependency, and it only powers the optional auto-fill of OAT and pressure altitude. If you're offline, the proxy is down, or you just prefer it: type OAT/PA straight from ATIS/FMC and the card builds identically. **Nothing about offline operation depends on the network.**

Pressure altitude from a METAR is computed as:
`PA = field_elev_ft + (29.92 − altimeter_inHg) × 1000`
using station elevation and altimeter from the observation.

## Phase notes

| Phase | Inputs | Source |
|-------|--------|--------|
| Takeoff | Actual OAT + field PA | Real weather / manual |
| Go-Around | Actual OAT + field PA (arrival) | Real weather / manual |
| Max Climb | TAT @ ~FL250 | **ISA estimate** — reset from actual TAT |
| Max Cruise | TAT @ cruise FL (±10°) | **ISA estimate** — reset from actual TAT |

Climb/cruise TAT on the card is an ISA estimate (clearly labelled). For the real number, use **Manual lookup** with the actual TAT off the gauge.

## Corrections (applied per phase, chart-accurate)

- **Takeoff:** Packs OFF +0.01 · Engine A/I 0.00 (≤8000 ft) / −0.03 (>8000 ft)
- **Climb:** Packs OFF, Engine A/I, Wing A/I — altitude-dependent
- **Cruise:** Engine A/I, Engine+Wing A/I — altitude-dependent
- **Go-Around:** Packs OFF +0.01 · Engine A/I 0.00 · Wing A/I −0.02 · Speed >160 KIAS −0.01

Go-around ships are certified for takeoff to 8,400 ft; certified to 9,500 ft: 636, 638, 640–641, 6815–6817, 6901–6904.

---

## Files

```
tools/tmc-epr/
├── index.html        # the whole app — HTML, CSS, JS, and all EPR data inline
├── manifest.json     # PWA manifest (scoped to this folder)
├── sw.js             # service worker — precaches the shell, passes weather to network
└── icons/
    ├── icon-512.png       # manifest master (any)
    ├── icon-192.png       # Android (any)
    ├── icon-180.png       # iOS home screen
    ├── maskable-512.png   # Android adaptive — safe zone + filled corners
    └── favicon-32.png     # browser tab
```

No build step, no frameworks, no external requests for app logic. All HTML/CSS/JS and the four EPR tables are inline in `index.html`; the manifest and service worker are the only sidecar files.

## Deploy (GitHub Pages)

1. Put the `tools/tmc-epr/` folder into your `tools` repo.
2. Enable GitHub Pages on the repo (Settings → Pages). HTTPS is required for service workers — Pages provides it free.
3. Open https://afherkdriver.github.io/tools/tmc-epr/ once while online to install and cache.
4. Add a tile to your launcher grid pointing at that path.

## Updating

The service worker caches everything, so **bump the cache version** whenever you change any file, or devices keep serving the old copy:

- `index.html` → `const CACHE_VERSION = "tmc-epr-vX.Y.Z";`
- `sw.js` → `const CACHE = "tmc-epr-vX.Y.Z";`

Keep the two strings identical. On next online load the new worker installs and clears old caches automatically.

---

## Changelog

### v1.0.1
- Custom EPR twin-gauge app icons (ENG 1 / ENG 2 tape display); regenerated full icon set incl. spec-compliant maskable.

### v1.0.0
- Initial release. Four PW2037 charts (Takeoff, Max Climb, Max Cruise, Go-Around) transcribed and validated. Weather pull via configurable CORS proxy with graceful manual fallback. Flight-card generator, manual lookup with bracket cross-check, full chart viewer, print/PDF, offline persistence, installable PWA.

---

*Data transcribed from operator thrust-setting charts. Verify against AFM/QRH. Not for primary thrust setting.*
