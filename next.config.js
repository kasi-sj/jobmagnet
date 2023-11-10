/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals : 'loose',
      serverActions: true,
      externalDir: true,
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com','utfs.io'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig
