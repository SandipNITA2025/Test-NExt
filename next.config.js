/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.postimg.cc', "res.cloudinary.com"], // Add the hostname of the image source here
    },
    webpack: (config) => {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
        canvas: "commonjs canvas",
      });
      // config.infrastructureLogging = { debug: /PackFileCache/ };
      return config;
    },
  };
  
  module.exports = nextConfig;