// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
   webpack: (config) => {
   config.resolve.alias.canvas = false;

   return config;
 },
};

export default nextConfig;
