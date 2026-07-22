export const site = {
  name: "Willingham Irrigation",
  url: "https://www.will-irr.com",
  phoneDisplay: "940-468-9178",
  phoneTel: "9404689178",
  /** Prefer texting over calls for new bookings */
  smsHref: "sms:9404689178",
  email: "case@will-irr.com",
  license: "#LI0030140",
  bookNowUrl:
    "https://book.housecallpro.com/book/Willingham-Irrigation/6e06bb46fdb04f3a873b5ff79cd78988?v2=true",
  portalUrl:
    "https://client.housecallpro.com/customer_portal/request-link?token=e58f7193b64443c28a3778721017892b",
  /** Public Google Business Profile reviews page — used for “Read all reviews” links */
  googleReviewsUrl: "https://maps.app.goo.gl/Bm1uUy7epMKJtCSy6",
  serviceArea:
    "Benbrook, White Settlement, Palmilla Springs, Weatherford, Fort Worth, and communities across the Greater Fort Worth area",
  tagline:
    "Licensed sprinkler repair and irrigation maintenance — plus holiday and landscape lighting.",
} as const;

/** Full site map — footer + mobile overflow */
export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/commercial", label: "Commercial" },
  { href: "/design", label: "Design" },
  { href: "/holiday-lighting", label: "Holiday lighting" },
  { href: "/landscape-lighting", label: "Landscape lighting" },
  { href: "/cities-we-serve", label: "Cities we serve" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

type NavLeaf = { href: string; label: string };
type NavGroup = { label: string; children: readonly NavLeaf[] };
export type HeaderNavItem = NavLeaf | NavGroup;

/** Slim primary header — groups secondary pages under dropdowns */
export const headerNav: readonly HeaderNavItem[] = [
  {
    label: "Services",
    children: [
      { href: "/services#memberships", label: "Memberships" },
      { href: "/services", label: "Irrigation repair" },
      { href: "/commercial", label: "Commercial" },
      { href: "/design", label: "Design" },
      { href: "/cities-we-serve", label: "Cities we serve" },
    ],
  },
  {
    label: "Lighting",
    children: [
      { href: "/holiday-lighting", label: "Holiday lighting" },
      { href: "/landscape-lighting", label: "Landscape lighting" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function isNavGroup(item: HeaderNavItem): item is NavGroup {
  return "children" in item;
}

/** Housecall Pro service ZIP coverage — used to derive cities we serve */
export const serviceZips = [
  "75052",
  "75054",
  "76001",
  "76002",
  "76006",
  "76008",
  "76009",
  "76010",
  "76011",
  "76012",
  "76013",
  "76014",
  "76015",
  "76016",
  "76017",
  "76018",
  "76020",
  "76022",
  "76028",
  "76031",
  "76033",
  "76035",
  "76036",
  "76040",
  "76044",
  "76048",
  "76049",
  "76053",
  "76058",
  "76059",
  "76060",
  "76061",
  "76063",
  "76065",
  "76076",
  "76084",
  "76085",
  "76086",
  "76087",
  "76088",
  "76102",
  "76103",
  "76104",
  "76105",
  "76106",
  "76107",
  "76108",
  "76109",
  "76110",
  "76111",
  "76112",
  "76114",
  "76115",
  "76116",
  "76117",
  "76118",
  "76119",
  "76120",
  "76123",
  "76126",
  "76127",
  "76129",
  "76131",
  "76132",
  "76133",
  "76134",
  "76135",
  "76137",
  "76140",
  "76148",
  "76164",
  "76177",
  "76179",
  "76180",
  "76244",
  "76248",
] as const;

/** City landers — enriched SEO data lives in lib/cities.ts */
export {
  cities,
  cityBySlug,
  getCityBySlug,
  PRIORITY_CITY_ORDER,
  getPriorityCities,
  getNearbyCities,
  citiesByRegion,
  regionLabels,
  type City,
  type CityFaq,
  type CityRegion,
} from "@/lib/cities";