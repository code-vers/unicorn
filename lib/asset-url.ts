const configuredAssetBase =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, '') ??
  'http://localhost:5000';

const assetBase = configuredAssetBase.replace(/\/$/, '');

export const getAssetUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${assetBase}/${path.replace(/^\//, '')}`;
};
