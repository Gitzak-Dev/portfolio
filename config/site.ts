const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://stackspacer.com";

export const siteConfig = {
  name: "StackSpacer",

  shortName: "StackSpacer",

  url: siteUrl,

  description:
    "StackSpacer builds mobile apps, AI automation systems, machine learning solutions, and modern web applications for startups and businesses.",

  email: "stackspacer@gmail.com",

  services: [
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
    },
    {
      name: "AI Automation",
      slug: "ai-automation",
    },
    {
      name: "Machine Learning",
      slug: "machine-learning",
    },
    {
      name: "Web Development",
      slug: "web-development",
    },
  ],

  navigation: {
    work: "/#work",
    services: "/services",
    about: "/about",
    contact: "/#contact",
  },

  locations: [
    {
      country: "United States",
      flag: "https://flagcdn.com/w160/us.png",
      address: "14425 Falcon Head Blvd, Austin, TX 78738",
      displayPhone: "+1 605 307 7258",
      tel: "+16053077258",
    },
    {
      country: "Australia",
      flag: "https://flagcdn.com/w160/au.png",
      address: "105 Leonard Street, Victoria Park 6100",
      displayPhone: "+61 468 175 292",
      tel: "+61468175292",
    },
    {
      country: "United Kingdom",
      flag: "https://flagcdn.com/w160/gb.png",
      address: "184 High Street North, East Ham, London E6",
      displayPhone: "020 3650 0476",
      tel: "02036500476",
    },
    {
      country: "Canada",
      flag: "https://flagcdn.com/w160/ca.png",
      address: "3549 Bala Dr, Mississauga, ON L5M 7N3",
      displayPhone: "(909) 443-2588",
      tel: "9094432588",
    },
  ],
} as const;

export const services = siteConfig.services;