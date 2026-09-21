import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/locations/new-york-city",
        destination: "/locations/new-york-city-new-york",
        permanent: true,
      },
      {
        source: "/locations/los-angeles",
        destination: "/locations/los-angeles-california",
        permanent: true,
      },
      {
        source: "/locations/chicago",
        destination: "/locations/chicago-illinois",
        permanent: true,
      },
      {
        source: "/locations/houston",
        destination: "/locations/houston-texas",
        permanent: true,
      },
      {
        source: "/locations/phoenix",
        destination: "/locations/phoenix-arizona",
        permanent: true,
      },
      {
        source: "/locations/philadelphia",
        destination: "/locations/philadelphia-pennsylvania",
        permanent: true,
      },
      {
        source: "/locations/san-francisco",
        destination: "/locations/san-francisco-california",
        permanent: true,
      },
      {
        source: "/locations/san-jose",
        destination: "/locations/san-jose-california",
        permanent: true,
      },
      {
        source: "/locations/seattle",
        destination: "/locations/seattle-washington",
        permanent: true,
      },
      {
        source: "/locations/dallas",
        destination: "/locations/dallas-texas",
        permanent: true,
      },
      {
        source: "/locations/austin",
        destination: "/locations/austin-texas",
        permanent: true,
      },
      {
        source: "/locations/miami",
        destination: "/locations/miami-florida",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
