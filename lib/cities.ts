// Avoid importing lib/site here (re-exports cities) — keep phone literal for FAQ copy.
const PHONE = "940-468-9178";

export type CityRegion =
  | "Tarrant"
  | "Parker"
  | "Johnson"
  | "Ellis"
  | "Dallas"
  | "Hood";

export type CityFaq = {
  question: string;
  answer: string;
};

export type City = {
  name: string;
  slug: string;
  short: string;
  region: CityRegion;
  /** Higher SEO investment — unique long-form body */
  priority?: boolean;
  /** 2–3 sentence intro unique to this city */
  blurb: string;
  /** Local service angles */
  highlights: string[];
  faqs: CityFaq[];
  /** Related city slugs for internal links */
  nearby: string[];
  /** Extra paragraphs for priority landers */
  body?: string[];
};

function slugFor(name: string, override?: string): string {
  return (
    override ??
    `irrigation-repair-${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-tx`
  );
}

function baseFaqs(name: string): CityFaq[] {
  return [
    {
      question: `Do you serve all of ${name}?`,
      answer: `Yes — we provide sprinkler and irrigation repair throughout ${name} and nearby North Texas communities. Text ${PHONE} if you’re unsure whether you’re in range.`,
    },
    {
      question: "How fast can you come out?",
      answer:
        "Timing depends on season and schedule. Book online or text and we’ll confirm the soonest available window.",
    },
    {
      question: "Do you offer maintenance memberships?",
      answer:
        "Yes. Silver and Gold plans include free service visits, spring start-up, and winterization — so you’re not paying per trip every time something breaks.",
    },
  ];
}

/** Primary SEO markets — display order for hub / home / footer */
export const PRIORITY_CITY_ORDER = [
  "Benbrook",
  "White Settlement",
  "Palmilla Springs",
  "Weatherford",
  "Fort Worth",
] as const;

const PRIORITY_NAMES = new Set<string>(PRIORITY_CITY_ORDER);

type CitySeed = {
  name: string;
  slugOverride?: string;
  region: CityRegion;
  blurb: string;
  highlights: string[];
  nearby: string[];
  faqs?: CityFaq[];
  body?: string[];
};

const seeds: CitySeed[] = [
  {
    name: "Aledo",
    region: "Parker",
    blurb:
      "Aledo yards take a beating from hot, dry summers and the occasional hard freeze. We keep sprinkler systems dialed in so turf and beds stay healthy without wasting water on Parker County clay.",
    highlights: [
      "Repair heads, valves, and wiring on established acreage lots",
      "Seasonal start-up and freeze prep for western suburbs",
      "Smart controller upgrades for weather-based watering",
    ],
    nearby: [
      "irrigation-repair-weatherford-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-benbrook-tx",
    ],
  },
  {
    name: "Alvarado",
    region: "Johnson",
    blurb:
      "South of Fort Worth, Alvarado properties need reliable irrigation through long dry stretches. We diagnose leaks, bad valves, and controller issues so your system keeps up with Johnson County heat.",
    highlights: [
      "Sprinkler repair for homes and small acreage",
      "Leak detection and valve replacement",
      "Spring start-up before peak watering season",
    ],
    nearby: [
      "irrigation-repair-burleson-tx",
      "irrigation-repair-cleburne-tx",
      "irrigation-repair-mansfield-tx",
    ],
  },
  {
    name: "Arlington",
    region: "Tarrant",
    blurb:
      "Arlington’s mix of older neighborhoods and new builds means sprinkler problems show up in every form — stuck valves, uneven coverage, and controllers that never matched the landscape. We fix systems across the city so lawns stay green through North Texas summers.",
    highlights: [
      "Fast diagnosis for dry spots and low pressure",
      "Controller programming for large residential lots",
      "Membership plans that cover spring and winter service",
    ],
    nearby: [
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-mansfield-tx",
      "irrigation-repair-grand-prairie-tx",
    ],
    body: [
      "Arlington homeowners search for sprinkler repair when brown patches show up overnight or a zone stops running after a controller glitch. Between Cowboys Stadium traffic corridors, older east-side neighborhoods, and newer south Arlington subdivisions, irrigation layouts vary — and so do the failure points. We come prepared for Hunter, Rain Bird, Toro, and Hydrawise gear common across Tarrant County.",
      "North Texas heat pushes systems hard from May through September. Heads get clipped by mowers, solenoids burn out, and poly lines crack under UV and soil movement. If you’re watering more than your neighbors and still seeing dry spots, you may have a coverage or pressure problem — not just a “needs more time” issue. We’ll walk the zones, check for leaks, and adjust or replace nozzles so water lands where the plant material actually is.",
      "We also handle spring start-up and winterization for Arlington properties. A proper shut-down before a freeze protects backflow assemblies and exposed piping; a thorough spring start catches winter damage before peak season. Silver and Gold memberships include those visits plus free service calls when something breaks mid-season.",
      "We regularly serve Arlington and surrounding cities across Greater Fort Worth. Book online or text — we’ll confirm timing and get your system watering evenly again.",
    ],
  },
  {
    name: "Azle",
    region: "Tarrant",
    blurb:
      "Northwest of Fort Worth, Azle yards face wind, heat, and rocky soils that stress irrigation. We repair and tune sprinkler systems so coverage stays even without runaway water bills.",
    highlights: [
      "Zone balancing for uneven lots",
      "Valve and solenoid replacement",
      "Seasonal service for Eagle Mountain–area homes",
    ],
    nearby: [
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-weatherford-tx",
      "irrigation-repair-keller-tx",
    ],
  },
  {
    name: "Bedford",
    region: "Tarrant",
    blurb:
      "Mid-Cities lawns in Bedford need consistent watering through hot summers. We repair broken heads, valves, and wiring — and help you schedule smarter so you’re not overwatering after every storm skip.",
    highlights: [
      "Mid-Cities sprinkler repair and diagnostics",
      "Smart controller setup and Wi-Fi upgrades",
      "Maintenance memberships with free visits",
    ],
    nearby: [
      "irrigation-repair-hurst-tx",
      "irrigation-repair-euless-tx",
      "irrigation-repair-north-richland-hills-tx",
    ],
  },
  {
    name: "Benbrook",
    region: "Tarrant",
    blurb:
      "Benbrook is one of our core service cities. We know local soils, freeze patterns, and the sprinkler brands installed across neighborhoods from the lake area to western Fort Worth borders — and we fix them promptly when something fails.",
    highlights: [
      "Local routes across Benbrook and western Fort Worth",
      "Spring start-up and freeze winterization included on plans",
      "Licensed Texas irrigator on every repair",
    ],
    nearby: [
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-whitesettlement-texas",
      "irrigation-repair-aledo-tx",
    ],
    body: [
      "If you live in Benbrook and your sprinklers quit, you’re not waiting on a distant call center — you’re dealing with a licensed North Texas irrigator who already serves these streets. Willingham Irrigation covers Benbrook and the western edge of Fort Worth for broken heads, leaking valves, dead zones, and controller failures.",
      "Benbrook landscapes deal with expansive clay, hot southwest winds, and cold snaps that catch exposed backflow preventers. Systems that ran fine in April often show cracked fittings or weak zones after the first real freeze. We winterize properly (no compressed-air “blowout” theater when it’s the wrong method for your setup) and start systems in spring so you’re ready before July heat peaks.",
      "Common Benbrook calls: one zone stuck on, rotary nozzles clogged with grit, rain sensors failing closed, and older clocks that won’t hold a program. We carry parts for the brands we see most, diagnose before we replace, and explain what failed so you’re not guessing next season.",
      "Homeowners here also lean on our Silver and Gold memberships — free service visits, seasonal start-up and winterization, and discounts on upgrades. Whether you’re near Benbrook Lake, Whisperwood, or the I-20 corridor, text or book online and we’ll get you on the calendar.",
    ],
  },
  {
    name: "Burleson",
    region: "Johnson",
    blurb:
      "Burleson continues to grow south of Fort Worth — and so do irrigation callbacks on new and older systems. We repair sprinklers, fix coverage gaps, and keep controllers programmed for Johnson County summers.",
    highlights: [
      "New-build and established-home sprinkler repair",
      "Low-pressure and dry-spot diagnosis",
      "Seasonal service before heat and before freezes",
    ],
    nearby: [
      "irrigation-repair-crowley-tx",
      "irrigation-repair-mansfield-tx",
      "irrigation-repair-joshua-tx",
    ],
    body: [
      "Burleson’s growth means a mix of builder-grade irrigation and older systems that were never rebalanced after landscape changes. When a zone waters the sidewalk or the back corner stays brown, that’s a repair and nozzle problem — not “add five more minutes.” We troubleshoot coverage, pressure, and valve issues across Burleson neighborhoods so water goes to turf and beds, not pavement.",
      "South Tarrant / north Johnson County heat is relentless. Controllers left on a fixed schedule waste water on rainy weeks and still leave dry patches in August. We repair hardware first, then help with programming or Hydrawise / smart upgrades when it makes sense for your yard size and water goals.",
      "We also handle spring start-up and winterization for Burleson homeowners who don’t want to gamble with freeze damage. Membership plans include those visits plus free service calls mid-season — usually cheaper than one after-hours emergency trip.",
      "We regularly run south to Burleson, Crowley, and Joshua from our Greater Fort Worth service area. Book online or text to schedule sprinkler repair in Burleson, TX.",
    ],
  },
  {
    name: "Cleburne",
    region: "Johnson",
    blurb:
      "Cleburne properties need irrigation that survives hot, dry stretches and occasional hard freezes. We repair sprinkler systems, replace failed valves, and get seasonal service done before weather extremes hit.",
    highlights: [
      "Residential and small commercial sprinkler repair",
      "Valve, head, and wiring diagnostics",
      "Winterization and spring start-up",
    ],
    nearby: [
      "irrigation-repair-keene-tx",
      "irrigation-repair-joshua-tx",
      "irrigation-repair-burleson-tx",
    ],
  },
  {
    name: "Cresson",
    region: "Hood",
    blurb:
      "Between Fort Worth and Granbury, Cresson lots often need irrigation tuned for larger yards and windy exposures. We repair systems and set schedules that match real North Texas weather.",
    highlights: [
      "Acreage and large-lot zone repair",
      "Controller and sensor troubleshooting",
      "Seasonal prep for freeze and heat",
    ],
    nearby: [
      "irrigation-repair-godley-tx",
      "irrigation-repair-weatherford-tx",
      "irrigation-repair-granbury-tx",
    ],
  },
  {
    name: "Crowley",
    region: "Tarrant",
    blurb:
      "Crowley sits in the south Fort Worth growth corridor where sprinkler issues are common on both new installs and aging systems. We fix leaks, dead zones, and controller problems quickly.",
    highlights: [
      "South Fort Worth corridor sprinkler repair",
      "Head and nozzle replacement for even coverage",
      "Membership plans with free service visits",
    ],
    nearby: [
      "irrigation-repair-burleson-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-joshua-tx",
    ],
  },
  {
    name: "Euless",
    region: "Tarrant",
    blurb:
      "Euless Mid-Cities lawns take summer heat and airline-corridor weather swings. We keep sprinkler systems repaired and programmed so you’re not fighting dry spots every July.",
    highlights: [
      "Mid-Cities irrigation diagnostics",
      "Smart controller and rain-sensor repair",
      "Spring and winter seasonal service",
    ],
    nearby: [
      "irrigation-repair-bedford-tx",
      "irrigation-repair-hurst-tx",
      "irrigation-repair-arlington-tx",
    ],
  },
  {
    name: "Fort Worth",
    slugOverride: "irrigation-repair-fortworth-tx",
    region: "Tarrant",
    blurb:
      "Fort Worth is our largest market — from westside neighborhoods near Benbrook to south and mid-cities corridors. We provide licensed sprinkler repair, seasonal service, and memberships built for North Texas heat and freezes.",
    highlights: [
      "Citywide coverage across Greater Fort Worth",
      "Repairs, seasonal service, and smart upgrades",
      "Commercial and residential irrigation help",
    ],
    nearby: [
      "irrigation-repair-benbrook-tx",
      "irrigation-repair-arlington-tx",
      "irrigation-repair-whitesettlement-texas",
    ],
    body: [
      "Searching for sprinkler repair in Fort Worth usually means something failed at the worst time — a valve stuck open flooding the curb, a controller blank after a storm, or half the front yard brown while the parkway gets soaked. Willingham Irrigation serves Fort Worth homeowners and property managers with licensed diagnosis and repair, not a parts-only parts run.",
      "Fort Worth spans very different irrigation conditions: older central neighborhoods with aging poly and galvanized odds-and-ends, westside lots that share Benbrook’s clay and freeze exposure, and newer subdivisions with builder systems that were never commissioned well. We see Hunter, Rain Bird, Irritrol, and Hydrawise daily. We test zones, locate leaks, replace solenoids and heads, and rebalance coverage after landscape changes.",
      "North Texas summers punish inefficient systems. Overwatering hardscapes wastes money and can violate local watering rules; underwatering during heat waves kills turf in days. After repairs, we help you set a schedule that matches season and soil — and we can upgrade to weather-based smart controllers when you want less babysitting.",
      "Seasonal service matters here. Winter freezes crack backflows and fittings; spring start-up catches damage before June. Our Silver and Gold memberships include those visits plus free service calls. We book Fort Worth jobs constantly — text or schedule online to get on the route.",
    ],
  },
  {
    name: "Godley",
    region: "Johnson",
    blurb:
      "Godley properties west of Burleson often have larger yards and longer lateral runs. We repair irrigation systems so distant zones still get pressure and even coverage.",
    highlights: [
      "Large-lot zone and pressure troubleshooting",
      "Valve box and wiring repairs",
      "Seasonal start-up and winterization",
    ],
    nearby: [
      "irrigation-repair-cresson-tx",
      "irrigation-repair-joshua-tx",
      "irrigation-repair-cleburne-tx",
    ],
  },
  {
    name: "Grand Prairie",
    slugOverride: "irrigation-repair-grand-prairie-tx",
    region: "Dallas",
    blurb:
      "Grand Prairie straddles the DFW mid-cities edge where heat and clay soils stress sprinklers. We repair systems and tune coverage so lawns hold color without constant overwatering.",
    highlights: [
      "Sprinkler repair for mid-cities Grand Prairie homes",
      "Dry-spot and runoff diagnosis",
      "Controller programming and upgrades",
    ],
    nearby: [
      "irrigation-repair-arlington-tx",
      "irrigation-repair-mansfield-tx",
      "irrigation-repair-fortworth-tx",
    ],
  },
  {
    name: "Granbury",
    region: "Hood",
    blurb:
      "Lake-area and ranchette properties around Granbury need irrigation that handles wind and heat. We repair sprinkler systems and prep them for both peak summer and winter freezes.",
    highlights: [
      "Hood County residential irrigation repair",
      "Seasonal service for freeze protection",
      "Controller and valve troubleshooting",
    ],
    nearby: [
      "irrigation-repair-cresson-tx",
      "irrigation-repair-weatherford-tx",
      "irrigation-repair-godley-tx",
    ],
  },
  {
    name: "Haltom City",
    slugOverride: "irrigation-repair-haltom-city-tx",
    region: "Tarrant",
    blurb:
      "Haltom City yards need dependable watering through Fort Worth summers. We fix broken heads, valves, and clocks so your system runs zone-by-zone without mystery dry patches.",
    highlights: [
      "Northeast Tarrant sprinkler repair",
      "Leak and valve diagnostics",
      "Membership options with free visits",
    ],
    nearby: [
      "irrigation-repair-north-richland-hills-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-keller-tx",
    ],
  },
  {
    name: "Hurst",
    region: "Tarrant",
    blurb:
      "Hurst Mid-Cities homes rely on sprinklers that keep up with heat and still shut down when it rains. We repair hardware and help with smarter scheduling.",
    highlights: [
      "Mid-Cities irrigation repair",
      "Rain sensor and controller fixes",
      "Spring start-up and winterization",
    ],
    nearby: [
      "irrigation-repair-bedford-tx",
      "irrigation-repair-euless-tx",
      "irrigation-repair-north-richland-hills-tx",
    ],
  },
  {
    name: "Joshua",
    region: "Johnson",
    blurb:
      "Joshua sits between Crowley’s growth and Cleburne’s rural edge — irrigation problems look like both. We repair residential systems and get seasonal service done on time.",
    highlights: [
      "Johnson County sprinkler repair",
      "Coverage fixes for newer subdivisions",
      "Freeze prep and spring activation",
    ],
    nearby: [
      "irrigation-repair-burleson-tx",
      "irrigation-repair-crowley-tx",
      "irrigation-repair-cleburne-tx",
    ],
  },
  {
    name: "Keene",
    region: "Johnson",
    blurb:
      "Keene properties need irrigation that holds through dry spells. We diagnose weak zones, replace failed parts, and keep controllers set for real local weather.",
    highlights: [
      "Residential sprinkler diagnostics",
      "Head, nozzle, and valve replacement",
      "Seasonal maintenance visits",
    ],
    nearby: [
      "irrigation-repair-cleburne-tx",
      "irrigation-repair-alvarado-tx",
      "irrigation-repair-joshua-tx",
    ],
  },
  {
    name: "Keller",
    region: "Tarrant",
    blurb:
      "Keller’s established neighborhoods and premium landscapes expect even, efficient watering. We repair sprinkler systems carefully — matching coverage to beds, turf, and HOA expectations.",
    highlights: [
      "Precision coverage for landscaped lots",
      "Quiet, clean valve and head repairs",
      "Smart controllers for weather-based schedules",
    ],
    nearby: [
      "irrigation-repair-north-richland-hills-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-bedford-tx",
    ],
    body: [
      "Keller homeowners often notice irrigation problems as cosmetic first — stripes in the turf, misting onto sidewalks, or a flower bed that never dries out. Underneath that is usually a mechanical issue: misaligned rotaries, worn nozzles, a failing zone valve, or a program that doesn’t match shade vs. full sun. We repair Fort Worth–north systems with an eye toward how the landscape is actually planted.",
      "Northeast Tarrant summers are brutal on irrigation. Clay soils crust, filters clog, and pressure changes when neighbors water at the same hour. We check each zone, fix leaks, and rebalance so you’re not dumping water on hardscape to save a dry corner. When it helps, we recommend rotary nozzles or a smart controller — not upsell for its own sake.",
      "Seasonal service is part of keeping Keller yards sharp. Winterization protects backflow and exposed piping; spring start-up catches freeze damage and resets schedules before heat. Memberships include those visits and free service calls when something fails mid-season.",
      "We serve Keller alongside North Richland Hills and northern Fort Worth. Text or book online for sprinkler repair in Keller, TX.",
    ],
  },
  {
    name: "Kennedale",
    region: "Tarrant",
    blurb:
      "Kennedale sits between Fort Worth and Arlington with a mix of established and growing streets. We repair sprinklers and tune systems for southeast Tarrant heat.",
    highlights: [
      "Southeast Fort Worth area irrigation repair",
      "Valve and wiring troubleshooting",
      "Seasonal start-up and winterization",
    ],
    nearby: [
      "irrigation-repair-arlington-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-mansfield-tx",
    ],
  },
  {
    name: "Lillian",
    region: "Johnson",
    blurb:
      "Lillian-area properties need irrigation that can handle open exposures and summer drought. We repair systems and prepare them for freeze season too.",
    highlights: [
      "Rural and small-town sprinkler repair",
      "Pressure and coverage diagnostics",
      "Seasonal service visits",
    ],
    nearby: [
      "irrigation-repair-alvarado-tx",
      "irrigation-repair-venus-tx",
      "irrigation-repair-mansfield-tx",
    ],
  },
  {
    name: "Mansfield",
    region: "Tarrant",
    blurb:
      "Mansfield’s rapid growth left many yards with builder irrigation that needs real commissioning. We repair, rebalance, and maintain sprinkler systems for southeast Tarrant homeowners.",
    highlights: [
      "New-construction and resale sprinkler tune-ups",
      "Dry-spot and runoff fixes",
      "Memberships with spring and winter included",
    ],
    nearby: [
      "irrigation-repair-arlington-tx",
      "irrigation-repair-burleson-tx",
      "irrigation-repair-midlothian-tx",
    ],
    body: [
      "Mansfield sprinkler repair calls often start the same way: the front yard looks fine, the side yard is dust, and the HOA letter is coming. Builder systems are frequently under-adjusted — wrong nozzles, overlapping poorly, or valves that never seated right after install. We diagnose zone by zone and fix what actually causes the symptom.",
      "Southeast Tarrant heat and clay amplify small irrigation mistakes. A slightly low head becomes a dry circle by July; a slow leak under mulch becomes a soft spot and a high water bill. We repair leaks, replace solenoids and heads, and help you water on a schedule that survives August without constant babysitting.",
      "We also offer spring start-up and winterization for Mansfield homes. Freezes still hit here hard enough to damage backflows and exposed fittings. Memberships bundle seasonal visits with free service calls so you’re covered year-round.",
      "We regularly serve Mansfield, Arlington, and Midlothian. Book online or text to schedule licensed sprinkler repair in Mansfield, TX.",
    ],
  },
  {
    name: "Midlothian",
    region: "Ellis",
    blurb:
      "Midlothian’s growth south of Mansfield brings new systems and new failure points. We repair irrigation, fix coverage, and get seasonal service on the calendar before extremes.",
    highlights: [
      "Ellis County residential sprinkler repair",
      "New-build system corrections",
      "Freeze prep and spring activation",
    ],
    nearby: [
      "irrigation-repair-mansfield-tx",
      "irrigation-repair-venus-tx",
      "irrigation-repair-alvarado-tx",
    ],
  },
  {
    name: "North Richland Hills",
    slugOverride: "irrigation-repair-north-richland-hills-tx",
    region: "Tarrant",
    blurb:
      "North Richland Hills lawns need even watering through Mid-Cities summers. We repair sprinkler systems and help with controllers that keep up with changing weather.",
    highlights: [
      "NRH and mid-cities irrigation repair",
      "Zone balancing and nozzle upgrades",
      "Seasonal memberships available",
    ],
    nearby: [
      "irrigation-repair-keller-tx",
      "irrigation-repair-haltom-city-tx",
      "irrigation-repair-bedford-tx",
    ],
  },
  {
    name: "Palmilla Springs",
    slugOverride: "irrigation-repair-palmilla-springs-tx",
    region: "Tarrant",
    blurb:
      "Palmilla Springs and nearby master-planned areas expect tidy, efficient irrigation. We repair systems discreetly and keep coverage matched to landscape design.",
    highlights: [
      "Community-friendly sprinkler repair",
      "Coverage tuned to beds and turf",
      "Controller programming and seasonal service",
    ],
    nearby: [
      "irrigation-repair-benbrook-tx",
      "irrigation-repair-whitesettlement-texas",
      "irrigation-repair-fortworth-tx",
    ],
    body: [
      "Palmilla Springs and similar planned communities expect irrigation that looks invisible — even coverage, no misting onto walks, and controllers that don’t wake the neighborhood at odd hours. When a zone fails or a bed stays dry while turf floods, we diagnose and repair with that standard in mind.",
      "Master-planned landscapes often mix turf, beds, and hardscape in tight spaces. Builder systems here are frequently under-adjusted after plantings mature. We rebalance nozzles, fix valves and wiring, and help set schedules that match shade vs. full sun without wasting water on pavement.",
      "Seasonal service matters as much here as anywhere in western Tarrant County. Winterization protects backflow and exposed fittings; spring start-up catches freeze damage before heat peaks. Silver and Gold memberships include those visits plus free service calls mid-season.",
      "We serve Palmilla Springs alongside Benbrook, White Settlement, and western Fort Worth. Text or book online for licensed sprinkler repair.",
    ],
  },
  {
    name: "Venus",
    region: "Johnson",
    blurb:
      "Venus properties need irrigation that survives open wind and heat. We repair sprinklers and prepare systems for both summer peak and winter freezes.",
    highlights: [
      "Johnson / Ellis edge sprinkler repair",
      "Pressure and coverage fixes",
      "Seasonal start-up and winterization",
    ],
    nearby: [
      "irrigation-repair-alvarado-tx",
      "irrigation-repair-midlothian-tx",
      "irrigation-repair-mansfield-tx",
    ],
  },
  {
    name: "Weatherford",
    region: "Parker",
    blurb:
      "Weatherford’s western exposure means wind, heat, and rocky soils that punish weak irrigation. We repair sprinkler systems across Parker County so yards stay watered without constant waste.",
    highlights: [
      "Parker County residential irrigation repair",
      "Wind-aware nozzle and coverage fixes",
      "Freeze winterization for western suburbs",
    ],
    nearby: [
      "irrigation-repair-aledo-tx",
      "irrigation-repair-azle-tx",
      "irrigation-repair-benbrook-tx",
    ],
    body: [
      "Sprinkler repair in Weatherford often means chasing low pressure on long laterals, wind-blown spray that never hits the turf, or freeze damage on exposed backflows. Parker County conditions are tougher than inner Fort Worth — more rock, more wind, and cold snaps that catch systems left charged. We diagnose and repair with that in mind.",
      "Common Weatherford calls include stuck valves after sediment events, rotary nozzles clogged with grit, and controllers that run full programs on rainy weeks. We fix the hardware, then help set a schedule that matches western North Texas summers — including smart controller options when you want weather-based skips.",
      "Seasonal service is especially important west of Fort Worth. Proper winterization protects your investment; spring start-up verifies every zone before heat arrives. Silver and Gold memberships include those visits plus free service calls when something fails mid-season.",
      "We serve Weatherford and Aledo regularly. Text or book online for licensed irrigation repair in Weatherford, TX.",
    ],
  },
  {
    name: "White Settlement",
    slugOverride: "irrigation-repair-whitesettlement-texas",
    region: "Tarrant",
    blurb:
      "White Settlement sits between Benbrook and western Fort Worth — right on our daily routes. We repair sprinkler systems fast for homeowners who need reliable watering without the downtown wait.",
    highlights: [
      "On our regular western Fort Worth / Benbrook routes",
      "Head, valve, and controller repairs",
      "Seasonal service and memberships",
    ],
    nearby: [
      "irrigation-repair-benbrook-tx",
      "irrigation-repair-fortworth-tx",
      "irrigation-repair-palmilla-springs-tx",
    ],
    body: [
      "White Settlement sits between Benbrook and western Fort Worth — right on routes we run constantly. When sprinklers quit, homeowners here want a licensed tech who already knows the area, not a long wait from across the metroplex. We repair broken heads, leaking valves, dead zones, and controller failures across White Settlement.",
      "Western Tarrant County heat and clay stress irrigation the same way they do in Benbrook: solenoids burn out in peak summer, poly lines crack, and freeze snaps catch exposed backflows. We winterize properly, start systems in spring, and fix coverage so water hits turf and beds — not the sidewalk.",
      "Common calls include one zone stuck on, rain sensors failing closed, and older clocks that won’t hold a program. We diagnose before we replace, carry parts for the brands we see most, and explain what failed so you’re not guessing next season.",
      "Memberships are a strong fit here — free service visits plus spring start-up and winterization. Text or book online for sprinkler repair in White Settlement, TX.",
    ],
  },
];

function buildCity(seed: CitySeed): City {
  const slug = slugFor(seed.name, seed.slugOverride);
  const priority = PRIORITY_NAMES.has(seed.name);
  return {
    name: seed.name,
    slug,
    short: `${seed.name}, TX`,
    region: seed.region,
    priority: priority || undefined,
    blurb: seed.blurb,
    highlights: seed.highlights,
    faqs: seed.faqs ?? baseFaqs(seed.name),
    nearby: seed.nearby,
    body: seed.body,
  };
}

export const cities: City[] = seeds
  .map(buildCity)
  .sort((a, b) => a.name.localeCompare(b.name));

export const cityBySlug: Record<string, City> = Object.fromEntries(
  cities.map((c) => [c.slug, c]),
);

export function getCityBySlug(slug: string): City | undefined {
  return cityBySlug[slug];
}

export function getPriorityCities(): City[] {
  return PRIORITY_CITY_ORDER.map(
    (name) => cities.find((c) => c.name === name),
  ).filter((c): c is City => Boolean(c));
}

export function getNearbyCities(city: City): City[] {
  return city.nearby
    .map((slug) => cityBySlug[slug])
    .filter((c): c is City => Boolean(c));
}

export function citiesByRegion(): { region: CityRegion; cities: City[] }[] {
  const order: CityRegion[] = [
    "Tarrant",
    "Parker",
    "Johnson",
    "Ellis",
    "Dallas",
    "Hood",
  ];
  return order
    .map((region) => ({
      region,
      cities: cities.filter((c) => c.region === region),
    }))
    .filter((g) => g.cities.length > 0);
}

export const regionLabels: Record<CityRegion, string> = {
  Tarrant: "Tarrant County",
  Parker: "Parker County",
  Johnson: "Johnson County",
  Ellis: "Ellis County",
  Dallas: "Dallas County (service edge)",
  Hood: "Hood County",
};
