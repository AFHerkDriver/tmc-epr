# Manual EPR — PW2037

Offline thrust reference for the Boeing 757 / PW2037, for use when the Thrust
Management Computer (TMC) is failed and you are flying manual EPR. Enter the city
pair, pull weather once while you have signal, and the app builds a quick-reference
card of target EPRs that works fully offline for the rest of the flight.

Live: https://afherkdriver.github.io/tools/tmc-epr/

Installable web app — open it once while online, then add it to your home screen.
After that first load it runs entirely offline, airplane mode included.

Display: Day, Night, or Auto theme — Day is a light, high-contrast layout for
sunlight; Night is a dark cockpit layout. A dim slider takes the screen below the
iPad's own minimum brightness for night ops, with an optional warm (red) tint to
preserve night vision. The layout adapts to portrait or landscape and is sized for
glove and turbulence use on an iPad.

In-flight mode hides the setup and enlarges the reference card and manual lookup
for at-a-glance use. A keep-awake toggle uses the iPad screen wake lock to stop the
display sleeping in flight, and re-engages automatically when you return to the app.

> Unofficial crew aid. EPR values are transcribed from the PW2037 thrust-setting
> charts and are for cross-reference only. Always confirm against the aircraft
> AFM / QRH / FOM and limitations before use.

## Using it

- **Build flight card** — enter departure and arrival ICAO and cruise FL, tap Pull weather, then Build card. The card shows a weather snapshot (raw METAR/TAF
  and computed pressure altitude) with target EPRs for Takeoff, Max Climb, Max
  Cruise, and Go-Around. It is saved on the device and reopens offline.
- **Manual lookup** — the in-flight authority. Choose the published chart grid
  values for any phase and read the target EPR with the correct bleed and anti-ice
  corrections, plus a bracket of neighbouring cells for cross-check.
- **Full charts** — the four complete transcribed tables, on board, for direct
  reading.
- **Print / save PDF** — the card prints clean on white for an EFB or paper backup.

## Weather and offline behaviour

Weather is pulled from aviationweather.gov to auto-fill OAT, altimeter and pressure altitude.
This is optional and online-only: if there is no signal, you can type OAT and PA
straight from ATIS or the FMC and the card builds exactly the same. The thrust
charts and the entire lookup engine are on the device, so the tool never depends
on a connection.

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
the exact figure, use Manual lookup with the actual TAT off the gauge.

## Corrections

- Takeoff: Packs OFF +0.01 · Engine A/I 0.00 (≤8000 ft) / −0.03 (>8000 ft)
- Climb: Packs OFF, Engine A/I, Wing A/I (altitude-dependent)
- Cruise: Engine A/I, Engine + Wing A/I (altitude-dependent)
- Go-Around: Packs OFF +0.01 · Engine A/I 0.00 · Wing A/I −0.02 · Speed >160 KIAS −0.01

Go-around ships are certified for takeoff to 8,400 ft; certified to 9,500 ft:
636, 638, 640–641, 6815–6817, 6901–6904.
