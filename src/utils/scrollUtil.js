// scrollUtils.js

/**
 * Ẩn hoặc hiện thanh cuộn
 * @param {boolean} value - Nếu là true thì ẩn thanh cuộn, false thì hiện lại
 */
export const toggleScroll = (value) => {
  document.html.style.overflowY = value ? "hidden" : "scroll";
};
