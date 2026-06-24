# Manual Thrust

Offline thrust reference for the Boeing 757 and 767, for use when the Thrust
Management Computer (TMC) is failed and you are setting thrust by hand. Pick the
aircraft/engine, enter the city pair, pull weather once while you have signal, and
the app builds a quick-reference card of target settings that works fully offline
for the rest of the flight.

Live: https://afherkdriver.github.io/tmc-epr/

Installable web app — open it once while online, then add it to your home screen.
After that first load it runs entirely offline, airplane mode included.

## Engines

Choose the aircraft/engine at the top of the build panel. The readout, card, and
manual lookup follow the selection and your choice is remembered.

| Aircraft        | Engine        | Sets thrust by |
|-----------------|---------------|----------------|
| 757             | PW2037        | EPR            |
| 757             | PW2040        | EPR            |
| 767-300ER       | PW4060        | EPR            |
| 767-300ER       | CF6-80C2B6F   | %N1            |

The CF6 reads in %N1 instead of EPR; every readout switches units and decimals to
match. Where a chart leaves a cell blank (high altitude with warm temperatures the
table does not publish), the value shows as "—" and manual lookup reports N/A
rather than a misleading number.

## Display

Day, Night, or Auto theme — Day is a light, high-contrast layout for sunlight;
Night is a dark cockpit layout. A dim slider takes the screen below the iPad's own
minimum brightness for night ops, with an optional warm (red) tint to preserve
night vision. The layout adapts to portrait or landscape and is sized for glove and
turbulence use on an iPad.

In-flight mode hides the setup and enlarges the reference card and manual lookup
for at-a-glance use. The screen is kept awake automatically while the app is open
(re-engaging when you return to it) so the display does not sleep in flight.

> Unofficial crew aid. Values are transcribed from the thrust-setting charts and
> are for cross-reference only. Always confirm against the aircraft AFM / QRH / FOM
> and limitations before use.

## Using it

- **Build flight card** — enter departure and arrival ICAO and cruise FL, tap Pull
  weather, then Build card. The card shows a weather snapshot (raw METAR/TAF and
  computed pressure altitude) with target settings for Takeoff, Max Climb, Max
  Cruise, and Go-Around. It is saved on the device and reopens offline.
- **Manual lookup** — the in-flight authority. Choose the published chart grid
  values for any phase and read the target with the correct bleed and anti-ice
  corrections, plus a bracket of neighbouring cells for cross-check. The bleed and
  anti-ice toggles shown are exactly the ones each chart publishes, so a correction
  that does not exist for a given table (for example engine anti-ice on some takeoff
  charts) simply does not appear.
- **Full charts** — the complete transcribed tables for the selected engine, on
  board, for direct reading. Manual lookup highlights the row, column, and cell you
  picked on the matching chart.
- **Print / save PDF** — the card prints clean on white for an EFB or paper backup.

## Weather and offline behaviour

Weather is pulled from aviationweather.gov to auto-fill OAT, altimeter and pressure
altitude. Fields filled from a successful pull turn blue, so at a glance you can
tell a pulled value from one you typed; editing a field clears the blue. This pull
is optional and online-only: with no signal, type OAT and PA straight from ATIS or
the FMC and the card builds exactly the same. The thrust charts and the entire
lookup engine are on the device, so the tool never depends on a connection.

Pressure altitude from a report is computed as:
PA = field elevation ft + (29.92 − altimeter inHg) × 1000.

## Phases

| Phase      | Based on                                   |
|------------|--------------------------------------------|
| Takeoff    | Actual OAT and field pressure altitude     |
| Go-Around  | Actual OAT and field pressure altitude     |
| Max Climb  | TAT (ISA estimate — reset from actual TAT) |
| Max Cruise | TAT at cruise FL (ISA estimate, ±10°)      |

Climb and cruise TAT on the card are ISA estimates and are labelled as such. For
the exact figure, use Manual lookup with the actual TAT off the gauge. Bleed and
anti-ice corrections, and the grid each phase reads from, are per the selected
engine's charts.
