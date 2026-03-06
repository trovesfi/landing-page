import React from "react";

import { SOCIAL_URLS } from "@/constants";
import { BASE_URLS } from "@/constants/links";

const siteUrl = BASE_URLS.SITE;
const siteName = "Troves";
const siteDescription =
  "Troves is a Starknet yield platform with curated one-click vaults, transparent risk and audit disclosures, and strategy curation by teams like RE7 Labs and Unwrap Labs.";

const StructuredData = () => {
  const organizationId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${siteUrl}#webpage`;
  const serviceId = `${siteUrl}#service`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/logos/full-logo.svg`,
        description: siteDescription,
        sameAs: SOCIAL_URLS,
        knowsAbout: [
          "Starknet DeFi",
          "Curated yield vault strategies",
          "Risk disclosures",
          "Audit transparency",
          "APY methodology",
          "Vault redemption flows",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteUrl,
        name: "Troves | Curated Starknet Yield Vaults",
        description: siteDescription,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": serviceId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/logos/full-logo.svg`,
        },
      },
      {
        "@type": "FinancialService",
        "@id": serviceId,
        name: "Troves Curated Yield Vaults",
        provider: {
          "@id": organizationId,
        },
        areaServed: "Global",
        serviceType: "Non-custodial DeFi yield vault strategies on Starknet",
        description:
          "One-click curated vault strategies for BTC, ETH, STRK and USDC with transparent audit, risk, redemption and APY methodology context.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Troves Core Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Curated one-click vault strategies",
              description:
                "Curated automated yield vaults for BTC, ETH, STRK and USDC on Starknet.",
            },
            {
              "@type": "Offer",
              name: "Transparent strategy disclosures",
              description:
                "Audit information, risk information, redemption behavior, access controls and APY methodology are documented.",
            },
            {
              "@type": "Offer",
              name: "Institutional-grade curation",
              description:
                "Strategies curated with teams like RE7 Labs and Unwrap Labs.",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What does Troves do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Troves provides curated one-click Starknet vault strategies for BTC, ETH, STRK and USDC.",
            },
          },
          {
            "@type": "Question",
            name: "How transparent are Troves strategies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Troves publishes strategy context including audits, risk framing, APY methodology, access controls and redemption behavior.",
            },
          },
          {
            "@type": "Question",
            name: "Who curates Troves strategies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Troves strategies are curated by Starknet-native teams and collaborators including RE7 Labs and Unwrap Labs.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />
    </>
  );
};

export default StructuredData;
