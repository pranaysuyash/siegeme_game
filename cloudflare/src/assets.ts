const MAX_DIMENSION = 4096;
export const MAX_IMAGE_BYTES = 2_000_000;

function ascii(bytes: Uint8Array, start: number, length: number) {
  return new TextDecoder().decode(bytes.slice(start, start + length));
}

function u32be(bytes: Uint8Array, offset: number) {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, false);
}

function u32le(bytes: Uint8Array, offset: number) {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, true);
}

function concat(parts: Uint8Array[]) {
  const length = parts.reduce((total, part) => total + part.byteLength, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.byteLength; }
  return result;
}

function readPng(bytes: Uint8Array) {
  if (bytes.byteLength < 33 || ascii(bytes, 12, 4) !== "IHDR") return null;
  const width = u32be(bytes, 16);
  const height = u32be(bytes, 20);
  if (!width || !height || width > MAX_DIMENSION || height > MAX_DIMENSION) return null;
  const chunks: Uint8Array[] = [bytes.slice(0, 8)];
  let offset = 8;
  while (offset + 12 <= bytes.byteLength) {
    const length = u32be(bytes, offset);
    const end = offset + 12 + length;
    if (end > bytes.byteLength) return null;
    const type = ascii(bytes, offset + 4, 4);
    if (type === "IHDR" || type === "PLTE" || type === "tRNS" || type === "IDAT" || type === "IEND") chunks.push(bytes.slice(offset, end));
    offset = end;
    if (type === "IEND") break;
  }
  return offset === bytes.byteLength || ascii(bytes, offset - 12, 4) === "IEND" ? concat(chunks) : null;
}

function readJpeg(bytes: Uint8Array) {
  if (bytes.byteLength < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.byteLength - 2] !== 0xff || bytes[bytes.byteLength - 1] !== 0xd9) return null;
  const parts: Uint8Array[] = [bytes.slice(0, 2)];
  let offset = 2;
  let dimensions: [number, number] | null = null;
  while (offset < bytes.byteLength) {
    if (bytes[offset] !== 0xff) return null;
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset++];
    if (marker === 0xd9 || marker === 0xda) {
      parts.push(bytes.slice(offset - 2));
      break;
    }
    if (offset + 2 > bytes.byteLength) return null;
    const length = (bytes[offset] << 8) | bytes[offset + 1];
    if (length < 2 || offset + length > bytes.byteLength) return null;
    const start = offset - 2;
    const isMetadata = marker === 0xe1 || marker === 0xed || marker === 0xfe;
    if (!isMetadata) parts.push(bytes.slice(start, offset + length));
    if (!dimensions && marker >= 0xc0 && marker <= 0xc3) dimensions = [(bytes[offset + 3] << 8) | bytes[offset + 4], (bytes[offset + 1] << 8) | bytes[offset + 2]];
    offset += length;
  }
  if (!dimensions || dimensions[0] > MAX_DIMENSION || dimensions[1] > MAX_DIMENSION) return null;
  return concat(parts);
}

function readWebp(bytes: Uint8Array) {
  if (bytes.byteLength < 20 || ascii(bytes, 0, 4) !== "RIFF" || ascii(bytes, 8, 4) !== "WEBP") return null;
  const parts: Uint8Array[] = [bytes.slice(0, 12)];
  let offset = 12;
  let dimensions: [number, number] | null = null;
  while (offset + 8 <= bytes.byteLength) {
    const type = ascii(bytes, offset, 4);
    const length = u32le(bytes, offset + 4);
    const end = offset + 8 + length;
    if (end > bytes.byteLength) return null;
    const data = bytes.slice(offset + 8, end);
    if (type === "VP8X" && data.byteLength >= 10) dimensions = [1 + data[4] + (data[5] << 8) + (data[6] << 16), 1 + data[7] + (data[8] << 8) + (data[9] << 16)];
    if (type === "EXIF" || type === "XMP " || type === "ICCP") { offset = end + (length % 2); continue; }
    parts.push(bytes.slice(offset, end + (length % 2)));
    offset = end + (length % 2);
  }
  if (!dimensions || dimensions[0] > MAX_DIMENSION || dimensions[1] > MAX_DIMENSION) return null;
  const result = concat(parts);
  new DataView(result.buffer).setUint32(4, result.byteLength - 8, true);
  return result;
}

export function sanitizeImage(contentType: string, bytes: Uint8Array) {
  const sanitized = contentType === "image/png" ? readPng(bytes) : contentType === "image/jpeg" ? readJpeg(bytes) : contentType === "image/webp" ? readWebp(bytes) : null;
  return sanitized ? { bytes: sanitized, sanitation: sanitized.byteLength === bytes.byteLength ? "signature-and-dimensions-checked" : "metadata-stripped-and-dimensions-checked" } : null;
}
