import { describe, expect, it } from "vitest";
import { sanitizeImage } from "./assets";

const pngWithText = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10,
  0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137,
  0, 0, 0, 3, 116, 69, 88, 116, 1, 2, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
]);

describe("asset sanitation", () => {
  it("strips PNG ancillary metadata while retaining the image envelope", () => {
    const result = sanitizeImage("image/png", pngWithText);
    expect(result?.sanitation).toBe("metadata-stripped-and-dimensions-checked");
    expect(new TextDecoder().decode(result?.bytes)).not.toContain("tEXt");
  });

  it("rejects unsupported or malformed image bytes", () => {
    expect(sanitizeImage("image/png", new Uint8Array([1, 2, 3]))).toBeNull();
    expect(sanitizeImage("image/gif", pngWithText)).toBeNull();
  });
});
