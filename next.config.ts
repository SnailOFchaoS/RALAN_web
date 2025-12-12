const isExport = process.env.NEXT_EXPORT === '1' || process.env.NEXT_EXPORT === 'true';
const basePath = isExport ? (process.env.BASE_PATH ?? '') : '';

const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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