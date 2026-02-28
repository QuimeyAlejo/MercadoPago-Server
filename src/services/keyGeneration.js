import crypto from "crypto";

export function generateFakeGameKey() {
  const segments = 5;
  const segmentLength = 5;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const parts = [];

  for (let i = 0; i < segments; i++) {
    const randomBytes = crypto.randomBytes(segmentLength);
    let segment = "";

    for (let j = 0; j < segmentLength; j++) {
      segment += chars[randomBytes[j] % chars.length];
    }

    parts.push(segment);
  }

  return parts.join("-");

  
}
export function generateKeysForOrder(items) {
  return items.map(item => ({
    name: item.title,
    keys: Array.from({ length: item.quantity }, () =>
      generateFakeGameKey()
    )
  }));
}