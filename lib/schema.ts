import localBusiness from "@/lib/schema/local-business.json";
import type { City, CityFaq } from "@/lib/cities";
import { cities } from "@/lib/cities";
import type { Post } from "@/lib/content/posts";
import { getReviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export async function getLocalBusinessJsonLd() {
  const reviews = await getReviews();
  const data = { ...(localBusiness as Record<string, unknown>) };

  data["@type"] = "HomeAndConstructionBusiness";

  data.areaServed = cities.map((c) => ({
    "@type": "City",
    name: c.name,
    addressRegion: "TX",
    addressCountry: "US",
  }));

  const sameAs = [...((data.sameAs as string[] | undefined) ?? [])];
  if (reviews.googleReviewsUrl && !sameAs.includes(reviews.googleReviewsUrl)) {
    sameAs.push(reviews.googleReviewsUrl);
  }
  if (sameAs.length) data.sameAs = sameAs;

  if (reviews.aggregateRating != null && reviews.reviewCount != null) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.aggregateRating,
      reviewCount: reviews.reviewCount,
      bestRating: 5,
    };
  }

  return data;
}

export function getFaqPageJsonLd(faqs: CityFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function getCityServiceJsonLd(city: City) {
  return {
    "@type": "Service",
    name: `Sprinkler and irrigation repair in ${city.name}, TX`,
    serviceType: "Sprinkler repair",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url,
      telephone: `+1${site.phoneTel}`,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "TX",
      addressCountry: "US",
    },
    url: `${site.url}/${city.slug}`,
  };
}

export function getCityPageJsonLd(city: City) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Cities we serve", path: "/cities-we-serve" },
        { name: city.name, path: `/${city.slug}` },
      ]),
      getCityServiceJsonLd(city),
      getFaqPageJsonLd(city.faqs),
    ],
  };
}

export function getCitiesHubJsonLd(faqs: CityFaq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Cities we serve", path: "/cities-we-serve" },
      ]),
      {
        "@type": "WebPage",
        name: "Sprinkler Repair Across North Texas & Greater Fort Worth",
        url: `${site.url}/cities-we-serve`,
        description: site.serviceArea,
        about: {
          "@type": "Service",
          name: "Sprinkler and irrigation repair",
          areaServed: cities.map((c) => ({
            "@type": "City",
            name: c.name,
            addressRegion: "TX",
          })),
        },
      },
      getFaqPageJsonLd(faqs),
    ],
  };
}

export function getBlogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: "Case Willingham",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/post/${post.slug}`,
    },
    url: `${site.url}/post/${post.slug}`,
    image: post.image ? `${site.url}${post.image}` : undefined,
  };
}
