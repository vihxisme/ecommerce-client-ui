
export const CLOUDINARY_CONFIG = {
  BASE_URL: process.env.VUE_APP_CLOUDINARY_BASE_URL || "https://res.cloudinary.com/djyizxfut/image/upload/",
};

export const getCloudinaryUrl = (path) => {
  if (!path) return ""; // hoặc fallback URL
  return `${CLOUDINARY_CONFIG.BASE_URL}${path}`;
};