export function isValidName(str) {
  if (typeof str !== "string" || !str.trim() || str.includes("\n")) {
    return false;
  }
  try {
    new RegExp(str);
    return true;
  } catch {
    return false;
  }
}

export function toSlug(str) {
  return str.toLowerCase();
}
