export function getTextColorForBackground(backgroundColor) {
  // Remove # if present
  const color = backgroundColor.startsWith('#') ? backgroundColor.slice(1);

  // Convert hex to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate relative luminance (per WCAG 2.0)
  // First normalize RGB values
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // Convert to linear RGB values (gamma correction)
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  // Use white text for dark backgrounds, black text for light backgrounds
  // The threshold is 0.5 but is adjustable based on preference
  return luminance > 0.5 ? 'black' : 'white';
}
