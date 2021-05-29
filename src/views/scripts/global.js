/**
 * Based on https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
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
