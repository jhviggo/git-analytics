/**
 * Based on https://stackoverflow.com/questions/2464745/compute-hex-color-code-for-an-arbitrary-string
 * 
 * @param {string} str 
 * @returns {string} hex colour
 */
 function generateColour(str, shift=5) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << shift) - hash);
  }

  const c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}
