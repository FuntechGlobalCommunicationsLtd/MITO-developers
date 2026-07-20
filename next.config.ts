import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/developers/api-reference/collect",
        destination: "/developers/api-reference",
        permanent: true,
      },
      {
        source: "/developers/api-reference/process-forex",
        destination: "/developers/api-reference",
        permanent: true,
      },
      {
        source: "/developers/api-reference/disburse",
        destination: "/developers/api-reference",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
