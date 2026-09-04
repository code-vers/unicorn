import type { NextConfig } from 'next';

if (process.env.NODE_ENV === 'production') {
  const requiredPublicVariables = [
    'NEXT_PUBLIC_API_BASE_URL',
    'NEXT_PUBLIC_ASSET_BASE_URL',
    'NEXT_PUBLIC_SITE_URL'
  ];
  const missingVariables = requiredPublicVariables.filter((name) => !process.env[name]);
  if (missingVariables.length > 0) {
    throw new Error(`Missing required production environment variables: ${missingVariables.join(', ')}`);
  }
}

const assetOrigin = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? 'http://localhost:5000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('/uploads/**', assetOrigin)]
  }
};

export default nextConfig;
