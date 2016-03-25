export default {
  isSmallScreen() {
    return window.innerWidth <= 700;
  },
  toPath(str) {
    return str.toLowerCase().replace(/\s/g, '');
  }
};
