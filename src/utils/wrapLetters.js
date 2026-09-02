/**
 * Splits text into per-character units for letter-span rendering.
 * @param {string} text
 * @returns {{ char: string, isSpace: boolean, index: number }[]}
 */
export function splitIntoLetters(text) {
  return [...text].map((char, index) => ({
    char,
    isSpace: char === " ",
    index,
  }));
}

/**
 * Builds a stable React key segment for a letter within a line.
 * @param {string} lineId
 * @param {number} index
 */
export function letterKey(lineId, index) {
  return `${lineId}-${index}`;
}
