export class Color {
  static isHexColor = (color: string): boolean => {
    const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    return hexRegex.test(color.trim());
  };

  static isRgbColor = (color: string): boolean => {
    const rgbRegex =
      /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;
    const match = color.trim().match(rgbRegex);

    if (!match) return false;

    const [r, g, b] = [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
    ];

    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
  };

  static rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (value: number) => {
      const hex = value.toString(16).padStart(2, "0");
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
  };

  static parseRgb = (color: string): [number, number, number] | null => {
    if (!this.isRgbColor(color)) return null;

    const rgbRegex =
      /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;
    const match = color.match(rgbRegex);
    if (!match) return null;
    const [r, g, b] = [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
    ];
    return [r, g, b];
  };

  static toHex = (color: string | null): string | null => {
    if (color === null) return null;

    if (Color.isHexColor(color)) {
      // Return HEX with # symbol, even if input didn't have it
      return (color.startsWith("#") ? color : `#${color}`).toLowerCase();
    } else if (Color.isRgbColor(color)) {
      const rgb = Color.parseRgb(color);
      if (rgb) {
        return Color.rgbToHex(rgb[0], rgb[1], rgb[2]);
      }
    }
    return null;
  };
}
