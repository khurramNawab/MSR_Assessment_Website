/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  trailingSlash: true,

  basePath: "/msrassessment",

  assetPrefix: isProd ? "/msrassessment/" : "",
};

export default nextConfig;