# Content priority and owner corrections

Prompt 4 replaces the earlier visual and publication preferences. This note records editorial decisions; it is not rendered in the website.

## Project order

The audience is power, grid, renewable-energy, electrification and embedded-control readers. The ordering is an editorial fit to the owner's supported work, rather than a measured hiring rank, demand score or claim of commercial readiness. `src/lib/project-priority.ts` is the single project-priority mechanism, shared by the catalogue and related-project selection. The homepage's four selections remain editable in `src/data/site.ts` and use the same order.

| Order | Project | Reason for prominence |
| --- | --- | --- |
| 1 | range-extended-electric-vehicle | Flagship FYP; limited-charging use case, electric propulsion and integration methodology |
| 2 | center-tapped-transformer | Hands-on electrical-machine design, winding/core constraints and fabrication |
| 3 | micro-hydropower-plant | Renewable generation, system sizing and rural-electrification design |
| 4 | autonomous-navigation-robot | Academic sensor integration, embedded control and actuation |
| 5 | smart-access-monitoring-system | Embedded monitoring, timed/interrupt-driven design and access-control logic |
| 6 | electronic-voting-machine | Academic microcontroller interfacing, input handling and counting logic |
| 7 | substation-distribution-design | Power-network layout coursework |
| 8 | pcb-layout-practice | Circuit-board layout practice |
| 9 | temperature-monitoring-system | Sensor-based monitoring coursework |
| 10 | water-level-indication | Basic sensing and indication |
| 11 | matlab-signal-calculator | Academic signal analysis and GUI work |
| 12 | solidworks-engineering-drawing | Engineering drawing and modelling practice |
| 13 | frequency-band-pass-filter | Electronic frequency-selection coursework |
| 14 | audio-amplifier | Analog circuit coursework |
| 15 | digital-logic-clock | Digital logic coursework |
| 16 | rain-detection-circuit | Basic sensing circuitry |
| 17 | university-management-system | General C++ coursework |
| 18 | oop-library-management | Object-oriented programming coursework |
| 19 | traffic-monitoring-ethics | Ethics-coursework observation |

The thirteen concise entries keep the exact owner-supplied order. No coursework entry is promoted to an independently validated product. Filtering preserves the same editorial sequence; it does not introduce a second ranking mechanism.

## Primary-source context

All seven owner-supplied primary-source pages were accessible and reviewed on 11 October 2026. The relevance judgments below are inferences for this portfolio; the sources do not rank this owner's projects or validate their performance.

- [IEA — Modernising Grids in the Age of Electricity, executive summary](https://www.iea.org/reports/modernising-grids-in-the-age-of-electricity/executive-summary) describes the need for grid expansion alongside better use of existing assets, visibility and combined power-system/digital skills. This supports foregrounding power-system design and equipment work.
- [IEA — World Energy Employment 2025, executive summary](https://www.iea.org/reports/world-energy-employment-2025/executive-summary) identifies electricity generation, networks and storage as substantial parts of energy employment, alongside electrification. It supports the broad audience focus rather than a hiring prediction for an individual skill.
- [IEA — Building the Future Transmission Grid, executive summary](https://www.iea.org/reports/building-the-future-transmission-grid/executive-summary) discusses transformer/cable supply-chain and workforce constraints. The portfolio's small academic transformer is shown for design/fabrication learning, without equating it to utility-scale equipment.
- [IEA — Global EV Outlook 2026, electric vehicle charging](https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-charging-chap-6-and-10) connects charging availability and planning with electrification and grid capacity. This provides context for the REEV's limited-charging motivation and the EV-charging analytical manuscript, not proof that this prototype solves network constraints.
- [ILO / IRENA — Renewable Energy and Jobs: Annual Review 2025](https://www.ilo.org/publications/renewable-energy-and-jobs-annual-review-2025) discusses renewable-energy employment and the importance of education/training. It supports giving renewable-generation design a clear place in the portfolio.
- [International Federation of Robotics — Five Million Robots Now Operate in Factories Globally](https://ifr.org/news/five-million-robots-now-operate-in-factories-globally/) describes industrial automation and the importance of sensing and integration. The navigation robot remains an academic prototype, without industrial-production claims.
- [MathWorks — Power Systems](https://www.mathworks.com/solutions/power-systems.html) describes computation and modelling applications across grids and electrified transportation. This supports MATLAB's editorial prominence; it does not add Simulink, Simscape or an expertise claim to the owner's tool list.

## Identity, REEV and supporting information

- The owner corrects the current REEV direction to a prototype for areas with limited charging infrastructure, with a longer-term ambition to build a startup converting existing vehicles into REEVs. Public wording no longer uses the earlier seating description. FYP-1 remains complete; FYP-2/FYP-3, commercial conversions, measured vehicle performance and certification remain future/unestablished work. The electric motor drives the wheels; the petrol engine drives a generator supplying electrical energy.
- REEV accepted-abstract and EV-charging manuscript records lead engineering research discovery, followed by the published policy paper. Each retains its distinct status, author information and existing limitations.
- Power/renewable subjects and embedded/control subjects precede general computing in summaries. IESCO leads internship previews and galleries by explicit owner preference; dates remain unchanged.
- `src/data/skills.ts` centralises six software/tool areas and six engineering skills in the owner's specified order. Context stays at undergraduate academic practice and supervised internship exposure; there are no proficiency percentages or invented certification labels.
- **ECB / PCB interpretation:** the new `CV/Muhammad_Sharjeel_ATS_CV (2).pdf` explicitly lists “printed circuit board (PCB) design” and PCB layouts. Existing `Everything/CV/SHARJEEL CV.pdf` evidence also lists PCB Designing. The requested label is therefore normalised to **PCB design**. SCADA systems is owner-supplied and presented as a tool area/exposure, without claiming professional operator proficiency.
- The award/report SGPA difference, transformer measured ratings/tests, SAMS hardware status, formal robot test conditions, conference completion/proceedings and unestablished individual team responsibilities remain deferred. None is resolved by this editorial ordering.
