const isExport = process.env.NEXT_EXPORT === '1' || process.env.NEXT_EXPORT === 'true';
const basePath = isExport ? (process.env.BASE_PATH ?? '') : '';

const path = require('path');

const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  ...(isExport
    ? {
        output: 'export',
        basePath: basePath || undefined,
        assetPrefix: basePath ? `${basePath}/` : '',
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
}

module.exports = nextConfig