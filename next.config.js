// const withNextCircularDeps = require('next-circular-dependency')

/** @type {import('next').NextConfig} */
module.exports = {
  // withNextCircularDeps({ - uncomment to check for circular dependencies
  // exclude: /node_modules/,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['next-international', 'international-types'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/rarimo/js-sdk/2.0.0-rc.30/assets/logos/**',
      },
    ],
  },
  // https://github.com/vercel/next.js/issues/52091
  experimental: {
    serverComponentsExternalPackages: ['knex', '@collabland/discord', '@collabland/models'],
    esmExternals: 'loose',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
} // )
