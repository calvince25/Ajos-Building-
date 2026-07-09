import { Helmet } from "react-helmet-async";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SEOProps {
  /** Primary <title> tag */
  title: string;
  /** Meta description (max 160 chars) */
  description: string;
  /** Canonical URL — must be unique per page */
  canonical?: string;
  /** Open Graph image URL (1200×630 recommended) */
  ogImage?: string;
  /** Page type for Open Graph */
  ogType?: "website" | "article" | "profile";
  /** Comma-separated keyword phrases */
  keywords?: string;
  /** robots directive */
  robots?: string;
  /** Article published date (ISO 8601) — for blog pages */
  articlePublishedTime?: string;
  /** Article modified date (ISO 8601) */
  articleModifiedTime?: string;
  /** Article author name */
  articleAuthor?: string;
  /** Alternate hreflang URLs: e.g. { "en": "https://...", "fr": "https://..." } */
  alternateUrls?: Record<string, string>;
  /** Twitter card type */
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  /** Twitter @handle of site */
  twitterSite?: string;
  /** Structured JSON-LD schema data */
  structuredData?: Record<string, any>;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const SITE_NAME = "Titan Constructions Ltd";
const SITE_URL = "https://titanconstructions.co.ke";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
const TWITTER_HANDLE = "@Titan Construction";

/**
 * Enterprise-level SEO component.
 * Drop this at the top of every page to inject fully unique, non-repeating metadata.
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  alternateUrls,
  twitterCard = "summary_large_image",
  twitterSite = TWITTER_HANDLE,
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const path = canonical || (typeof window !== "undefined" ? window.location.pathname : "/");
  const canonicalFull = path.startsWith("http") ? path : `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* ── Primary Tags ─────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalFull} />

      {/* ── MetadataBase equivalent ───────────────────────── */}
      <meta name="generator" content="Titan Construction CMS" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="author" content={articleAuthor || SITE_NAME} />

      {/* ── Open Graph ────────────────────────────────────── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalFull} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      {/* ── Article-specific OG ───────────────────────────── */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}

      {/* ── Twitter Card ──────────────────────────────────── */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterSite} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* ── Alternate / hreflang URLs ─────────────────────── */}
      {alternateUrls &&
        Object.entries(alternateUrls).map(([lang, href]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

      {/* ── JSON-LD Structured Data ───────────────────────── */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// ─── Page-Specific SEO Config ─────────────────────────────────────────────────
// Each page exports its own SEO props — completely unique, never reused.

const BASE = SITE_URL;

export const HOME_SEO: SEOProps = {
  title: "Full-Service Construction & Engineering Firm",
  description:
    "Titan Construction delivers commercial, industrial, and residential construction with decades of structural engineering expertise. ISO 9001:2015 certified. Request a free proposal today.",
  canonical: `${BASE}/`,
  ogImage: `${BASE}/og-home.jpg`,
  ogType: "website",
  keywords:
    "construction firm, commercial construction, structural engineering, industrial contractor, residential development, civil engineering, building contractor, Chicago construction",
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: SITE_NAME,
        url: BASE,
        logo: `${BASE}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-312-555-0192",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
        sameAs: [
          "https://facebook.com/titanconstructions",
          "https://twitter.com/titanconstructions",
          "https://linkedin.com/company/titanconstructions",
          "https://instagram.com/titanconstructions",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: SITE_NAME,
        publisher: { "@id": `${BASE}/#organization` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE}/#localbusiness`,
        name: SITE_NAME,
        url: BASE,
        telephone: "+1-312-555-0192",
        address: {
          "@type": "PostalAddress",
          streetAddress: "48 Industrial Blvd, Suite 200",
          addressLocality: "Chicago",
          addressRegion: "IL",
          postalCode: "60601",
          addressCountry: "US"
        },
        image: `${BASE}/logo.png`,
      },
      {
        "@type": "SearchAction",
        target: `${BASE}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    ]
  },
};

export const SERVICES_SEO: SEOProps = {
  title: "Construction Services — Commercial, Industrial & Residential",
  description:
    "Explore Titan Construction's full range of construction services: commercial builds, industrial infrastructure, residential development, civil earthworks, renovation, and design-build engineering.",
  canonical: `${BASE}/services`,
  ogImage: `${BASE}/og-services.jpg`,
  ogType: "website",
  keywords:
    "construction services, commercial building contractor, industrial construction, residential building, civil earthworks, design build, renovation contractor, structural engineering services",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/services`,
    "x-default": `${BASE}/services`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE}/services#service`,
        serviceType: "Construction & Engineering",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE,
        },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        description: "Full-service construction and engineering services across commercial, industrial, and residential sectors.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Construction Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Construction"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Industrial & Infrastructure"
              }
            }
          ]
        }
      }
    ]
  },
};

export const PROJECTS_SEO: SEOProps = {
  title: "Project Portfolio — Completed Construction Projects",
  description:
    "Browse Titan Construction's portfolio of completed construction projects spanning commercial towers, industrial warehouses, civic infrastructure, and luxury residential communities.",
  canonical: `${BASE}/projects`,
  ogImage: `${BASE}/og-projects.jpg`,
  ogType: "website",
  keywords:
    "construction portfolio, completed projects, commercial construction projects, industrial builds, residential projects, building portfolio, construction case studies",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/projects`,
    "x-default": `${BASE}/projects`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${BASE}/projects#collection`,
        name: "Titan Construction Project Portfolio",
        description: "A collection of completed construction and engineering projects by Titan Construction.",
        url: `${BASE}/projects`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        hasPart: [
          {
            "@type": "CreativeWork",
            name: "Apex Tower — Commercial Hub",
            image: {
              "@type": "ImageObject",
              url: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&h=500&fit=crop&auto=format",
              contentUrl: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&h=500&fit=crop&auto=format"
            }
          },
          {
            "@type": "CreativeWork",
            name: "Meridian Business Park",
            image: {
              "@type": "ImageObject",
              url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&h=500&fit=crop&auto=format",
              contentUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&h=500&fit=crop&auto=format"
            }
          }
        ]
      }
    ]
  },
};

export const ABOUT_SEO: SEOProps = {
  title: "About Us — Our Story, Mission & Core Values",
  description:
    "Established in 1996, Titan Construction is an ISO 9001:2015 certified construction firm specializing in cost-certain delivery, in-house engineering, and OSHA-compliant site management across the United States.",
  canonical: `${BASE}/about`,
  ogImage: `${BASE}/og-about.jpg`,
  ogType: "website",
  keywords:
    "about Titan Construction, construction company history, ISO certified contractor, OSHA compliant construction, engineering firm Chicago, construction mission values",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/about`,
    "x-default": `${BASE}/about`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${BASE}/about#webpage`,
        name: "About Titan Construction",
        url: `${BASE}/about`,
        description: "The story and values behind Titan Constructions Ltd.",
        mainEntity: {
          "@type": "Organization",
          "@id": `${BASE}/#organization`,
          name: SITE_NAME,
          foundingDate: "1996",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 350 },
          address: {
            "@type": "PostalAddress",
            streetAddress: "48 Industrial Blvd, Suite 200",
            addressLocality: "Chicago",
            addressRegion: "IL",
            postalCode: "60601",
            addressCountry: "US",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/about#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: `${BASE}/about`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE}/about#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "When was Titan Construction established?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Titan Construction was founded in 1996 and has grown into a premier vertically integrated construction and engineering firm."
            }
          },
          {
            "@type": "Question",
            name: "Are you ISO and OSHA certified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we are ISO 9001:2015 certified and strictly follow OSHA 30-hour compliance for our crews."
            }
          }
        ]
      }
    ]
  },
};

export const TEAM_SEO: SEOProps = {
  title: "Leadership Team — Engineers, Architects & Project Managers",
  description:
    "Meet Titan Construction's leadership team: experienced civil engineers, licensed architects, and certified project managers with decades of combined expertise delivering complex construction projects.",
  canonical: `${BASE}/team`,
  ogImage: `${BASE}/og-team.jpg`,
  ogType: "website",
  keywords:
    "construction leadership team, civil engineers, licensed architects, project managers, Titan Construction team, construction experts, engineering staff",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/team`,
    "x-default": `${BASE}/team`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Titan Construction Leadership Team",
    url: `${BASE}/team`,
    description:
      "Profiles of the engineering and construction management leadership at Titan Construction.",
  },
};

export const BLOG_SEO: SEOProps = {
  title: "News & Insights — Construction Industry Blog",
  description:
    "Stay ahead with the latest construction industry news, structural engineering innovations, safety practices, project spotlights, and expert insights from the Titan Construction editorial team.",
  canonical: `${BASE}/blog`,
  ogImage: `${BASE}/og-blog.jpg`,
  ogType: "website",
  keywords:
    "construction blog, engineering insights, construction news, building industry trends, structural engineering articles, construction safety, project management tips",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/blog`,
    "x-default": `${BASE}/blog`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Titan Construction News & Insights",
    url: `${BASE}/blog`,
    description:
      "Construction industry articles, engineering guides, and project spotlights by Titan Construction.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
  },
};

export const CONTACT_SEO: SEOProps = {
  title: "Contact Us — Get a Free Construction Proposal",
  description:
    "Contact Titan Construction's construction experts for project inquiries, bid requests, structural consultations, or emergency site support. We respond within one business day.",
  canonical: `${BASE}/contact`,
  ogImage: `${BASE}/og-contact.jpg`,
  ogType: "website",
  keywords:
    "contact Titan Construction, construction inquiry, get a quote, building proposal, construction consultation, contractor contact, site assessment",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternateUrls: {
    "en": `${BASE}/contact`,
    "x-default": `${BASE}/contact`,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${BASE}/contact#localbusiness`,
        name: SITE_NAME,
        url: `${BASE}/contact`,
        telephone: "+1-312-555-0192",
        email: "projects@titanconstructions.co.ke",
        description: "Reach out to Titan Construction for construction project inquiries and free proposals.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "48 Industrial Blvd, Suite 200",
          addressLocality: "Chicago",
          addressRegion: "IL",
          postalCode: "60601",
          addressCountry: "US",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            opens: "07:00",
            closes: "17:00"
          }
        ],
        image: `${BASE}/og-contact.jpg`
      }
    ]
  },
};

/**
 * Generates dynamic SEO props for an individual blog post.
 */
export function getBlogPostSEO(post: {
  title: string;
  excerpt?: string;
  image_url?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  author?: string;
}): SEOProps {
  const slug = post.slug || post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return {
    title: post.title,
    description:
      post.excerpt ||
      `Read the full article: ${post.title}. Expert construction insights and industry analysis from Titan Construction Engineering.`,
    canonical: `${BASE}/blog/${slug}`,
    ogImage: post.image_url || DEFAULT_OG_IMAGE,
    ogType: "article",
    keywords: `${post.title.toLowerCase()}, construction article, engineering insights, Titan Construction blog`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    articlePublishedTime: post.created_at,
    articleModifiedTime: post.updated_at || post.created_at,
    articleAuthor: post.author || "Titan Editorial Team",
    twitterCard: "summary_large_image",
    alternateUrls: {
      "en": `${BASE}/blog/${slug}`,
      "x-default": `${BASE}/blog/${slug}`,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${BASE}/blog/${slug}#article`,
          headline: post.title,
          description: post.excerpt || "",
          image: post.image_url || DEFAULT_OG_IMAGE,
          datePublished: post.created_at,
          dateModified: post.updated_at || post.created_at,
          author: {
            "@id": `${BASE}/blog/${slug}#author`
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE}/blog/${slug}`,
          },
        },
        {
          "@type": "Person",
          "@id": `${BASE}/blog/${slug}#author`,
          name: post.author || "Titan Editorial Team",
          url: `${BASE}/team`
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${BASE}/blog/${slug}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${BASE}/blog`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `${BASE}/blog/${slug}`
            }
          ]
        }
      ]
    },
  };
}

/**
 * Generates FAQPage schema from an array of faqs
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      }
    }))
  };
}

/**
 * Generates Review and AggregateRating schema from an array of testimonials
 */
export function getTestimonialsSchema(testimonials: { name: string; rating?: number; text: string }[]) {
  if (!testimonials || testimonials.length === 0) return null;
  
  const validRatings = testimonials.filter(t => t.rating).map(t => t.rating as number);
  const averageRating = validRatings.length > 0 
    ? validRatings.reduce((a, b) => a + b, 0) / validRatings.length 
    : 5;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#product`,
        name: "Titan Construction Services",
        image: `${SITE_URL}/logo.png`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageRating.toFixed(1),
          reviewCount: testimonials.length,
          bestRating: 5,
          worstRating: 1
        },
        review: testimonials.map(t => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: t.name,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating || 5,
            bestRating: 5,
            worstRating: 1
          },
          reviewBody: t.text,
        }))
      }
    ]
  };
}
