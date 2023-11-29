/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
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
}
