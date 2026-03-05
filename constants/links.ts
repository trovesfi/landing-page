export const BASE_URLS = {
  SITE: process.env.NEXT_PUBLIC_SITE_URL || "https://troves.fi",
  APP: process.env.NEXT_PUBLIC_TROVES_API_URL || "https://app.troves.fi",
  DOCS: "https://docs.troves.fi",
} as const;

export const APP_ROUTES = {
  HOME: "/",
  STRATEGIES: `${BASE_URLS.APP}/?tab=all`,
  STRATEGY: (id: string) => `${BASE_URLS.APP}/strategy/${id}`,
  LAUNCH_DAPP: BASE_URLS.APP,
} as const;

export const DOCS_ROUTES = {
  HOME: BASE_URLS.DOCS,
  LEARN_MORE: BASE_URLS.DOCS,
} as const;

export const ANCHOR_LINKS = {
  HERO: "#hero",
  STRATEGIES: APP_ROUTES.STRATEGIES,
  DOCS: BASE_URLS.DOCS,
  DEFAULT: BASE_URLS.SITE,
} as const;

export const EXTERNAL_LINKS = {
  GITHUB_REPO: "https://github.com/trovesfi",
  GITHUB_STATIC_ASSETS: {
    TNC_V1:
      "https://github.com/trovesfi/static-assets/blob/177389cad715d69245c1b125df87f90318ac2d7b/tnc.pdf",
    TNC_V2:
      "https://github.com/trovesfi/static-assets/blob/a0b4ff3a3533df35570311d95be37f1ffcb7fb54/tnc_v2.pdf",
  },
} as const;

export const FOOTER_LINKS = {
  COMPANY: {
    ABOUT: "https://unwraplabs.com/",
    CAREERS: "https://unwraplabs.jobspage.co/",
    BLOGS: "https://blog.troves.fi/",
  },
  RESOURCES: {
    DOCUMENTATION: ANCHOR_LINKS.DOCS,
    GITHUB: EXTERNAL_LINKS.GITHUB_REPO,
    BRAND_KIT:
      "https://drive.google.com/drive/folders/1-D6uizWgdH2XwbP0f3Fc22wQgxhr_RUY",
  },
  INFO: {
    TERMS_OF_USE: "https://app.troves.fi/tnc/v2",
    BECOME_CURATOR: "https://docs.troves.fi/p/developers/become-a-curator",
  },
} as const;
