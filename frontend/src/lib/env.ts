export const env = {
  API_URL: import.meta.env.VITE_API_BASE_URL as string,
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  SITE_URL: import.meta.env.VITE_SITE_URL as string,
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Dash-it',
};

export const validateEnv = () => {
  if (import.meta.env.PROD) {
    if (!import.meta.env.VITE_API_BASE_URL) {
      console.warn('VITE_API_BASE_URL is missing.');
    }
  }
};
