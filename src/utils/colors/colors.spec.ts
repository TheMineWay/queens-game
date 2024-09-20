import { Color } from "@/utils/colors/color";

// Adjust the import path based on your project structure
describe("Color", () => {
  describe("isHexColor", () => {
    it("should return true for valid 6-digit HEX color", () => {
      expect(Color.isHexColor("#ff5733")).toBe(true);
      expect(Color.isHexColor("ff5733")).toBe(true);
    });

    it("should return true for valid 3-digit HEX color", () => {
      expect(Color.isHexColor("#fff")).toBe(true);
      expect(Color.isHexColor("fff")).toBe(true);
    });

    it("should return false for invalid HEX color", () => {
      expect(Color.isHexColor("#zzzzzz")).toBe(false);
      expect(Color.isHexColor("xyz")).toBe(false);
      expect(Color.isHexColor("#1234")).toBe(false);
    });
  });

  describe("isRgbColor", () => {
    it("should return true for valid RGB color", () => {
      expect(Color.isRgbColor("rgb(255, 87, 51)")).toBe(true);
      expect(Color.isRgbColor("rgb(0, 0, 0)")).toBe(true);
      expect(Color.isRgbColor("rgb(255, 255, 255)")).toBe(true);
    });

    it("should return false for invalid RGB color", () => {
      expect(Color.isRgbColor("rgb(256, 87, 51)")).toBe(false); // Invalid RGB value
      expect(Color.isRgbColor("rgb(255, 87)")).toBe(false); // Missing one value
      expect(Color.isRgbColor("rgb(255, 87, 51, 20)")).toBe(false); // Extra value
    });
  });

  describe("rgbToHex", () => {
    it("should correctly convert RGB values to HEX", () => {
      expect(Color.rgbToHex(255, 87, 51)).toBe("#ff5733");
      expect(Color.rgbToHex(0, 0, 0)).toBe("#000000");
      expect(Color.rgbToHex(255, 255, 255)).toBe("#ffffff");
    });
  });

  describe("parseRgb", () => {
    it("should correctly parse a valid RGB string to [r, g, b] array", () => {
      expect(Color.parseRgb("rgb(255, 87, 51)")).toEqual([255, 87, 51]);
      expect(Color.parseRgb("rgb(0, 0, 0)")).toEqual([0, 0, 0]);
      expect(Color.parseRgb("rgb(255, 255, 255)")).toEqual([255, 255, 255]);
    });

    it("should return null for invalid RGB strings", () => {
      expect(Color.parseRgb("rgb(300, 87, 51)")).toBeNull(); // Out-of-range value
      expect(Color.parseRgb("rgb(255, 87)")).toBeNull(); // Missing value
      expect(Color.parseRgb("rgb(255, 87, 51, 20)")).toBeNull(); // Too many values
    });
  });

  describe("toHex", () => {
    it("should return correct HEX value when input is a valid HEX string", () => {
      expect(Color.toHex("#ff5733")).toBe("#ff5733");
      expect(Color.toHex("ff5733")).toBe("#ff5733");
      expect(Color.toHex("#fff")).toBe("#fff");
      expect(Color.toHex("fff")).toBe("#fff");
    });

    it("should convert valid RGB string to HEX", () => {
      expect(Color.toHex("rgb(255, 87, 51)")).toBe("#ff5733");
      expect(Color.toHex("rgb(0, 0, 0)")).toBe("#000000");
      expect(Color.toHex("rgb(255, 255, 255)")).toBe("#ffffff");
    });

    it("should return null for invalid HEX or RGB strings", () => {
      expect(Color.toHex("rgb(300, 87, 51)")).toBeNull(); // Invalid RGB value
      expect(Color.toHex("random string")).toBeNull(); // Random string
      expect(Color.toHex("#ggg")).toBeNull(); // Invalid HEX
      expect(Color.toHex("rgb(255, 255, 255, 100)")).toBeNull(); // Invalid RGB format
    });
  });
});
