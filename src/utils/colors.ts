/**
 * Generate visually distinct colors using HSL color space
 */
export function generateDistinctColors(count: number): string[] {
  const colors: string[] = [];
  const saturation = 70;
  const lightness = 55;

  const goldenAngle = 137.508; // degrees

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenAngle) % 360;

    const hex = hslToHex(hue, saturation, lightness);
    colors.push(hex);
  }

  return colors;
}

/**
 * Generate vibrant colors with guaranteed minimum distance
 */
export function generateVibrantColors(count: number): string[] {
  const colors: string[] = [];
  const minHueDistance = 360 / count; // Minimum distance between hues

  for (let i = 0; i < count; i++) {
    const hue = (i * minHueDistance) % 360;

    const saturation = 60 + (i % 3) * 15;
    const lightness = 45 + (i % 4) * 10;

    const hex = hslToHex(hue, saturation, lightness);
    colors.push(hex);
  }

  return colors;
}

/**
 * Mix predefined colors with generated ones for best results
 */
export function generateMixedColors(
  count: number,
  baseColors: readonly string[],
): string[] {
  const colors: string[] = [];

  const shuffledBase = [...baseColors].sort(() => Math.random() - 0.5);
  colors.push(...shuffledBase.slice(0, Math.min(count, baseColors.length)));

  const remainingCount = count - colors.length;
  if (remainingCount > 0) {
    const generatedColors = generateDistinctColors(remainingCount);
    colors.push(...generatedColors);
  }

  return colors.slice(0, count);
}

/**
 * Convert HSL to Hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (saturation === 0) {
    r = g = b = lightness; // achromatic
  } else {
    const q =
      lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;

    r = hue2rgb(p, q, hue + 1 / 3);
    g = hue2rgb(p, q, hue);
    b = hue2rgb(p, q, hue - 1 / 3);
  }

  const toHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Check if two colors are visually distinct enough
 */
export function areColorsDistinct(
  color1: string,
  color2: string,
  threshold = 50,
): boolean {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return false;

  // Calculate Euclidean distance in RGB space
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2),
  );

  return distance > threshold;
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}
