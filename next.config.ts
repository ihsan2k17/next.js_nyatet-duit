import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://172.16.2.2:3000"]
};

module.exports = nextConfig;
