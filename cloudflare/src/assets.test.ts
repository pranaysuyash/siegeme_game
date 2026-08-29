import { describe, expect, it } from "vitest";
import { MAX_IMAGE_BYTES, sanitizeImage } from "./assets";

const pngWithText = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10,
  0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137,
  0, 0, 0, 3, 116, 69, 88, 116, 1, 2, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
]);

const jpegWithExif = new Uint8Array([
  0xff, 0xd8,
  0xff, 0xe1, 0x00, 0x06, 0x45, 0x78, 0x69, 0x66,
  0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00, 0x02, 0x03, 0x01, 0x11, 0x00,
  0xff, 0xd9,
]);

describe("asset sanitation", () => {
  it("publishes the hard upload byte limit for route enforcement", () => {
    expect(MAX_IMAGE_BYTES).toBe(2_000_000);
  });

  it("strips PNG ancillary metadata while retaining the image envelope", () => {
    const result = sanitizeImage("image/png", pngWithText);
    expect(result?.sanitation).toBe("metadata-stripped-and-dimensions-checked");
    expect(new TextDecoder().decode(result?.bytes)).not.toContain("tEXt");
  });

  it("rejects unsupported or malformed image bytes", () => {
    expect(sanitizeImage("image/png", new Uint8Array([1, 2, 3]))).toBeNull();
    expect(sanitizeImage("image/gif", pngWithText)).toBeNull();
    expect(sanitizeImage("image/png", new Uint8Array([...pngWithText, 1, 2, 3]))).toBeNull();
  });

  it("strips JPEG metadata and checks the actual SOF dimensions", () => {
    const result = sanitizeImage("image/jpeg", jpegWithExif);
    expect(result?.sanitation).toBe("metadata-stripped-and-dimensions-checked");
    expect(result?.bytes).not.toContain(0xe1);
  });
});
