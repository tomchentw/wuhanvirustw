export function isValidAsRegExp(str) {
  try {
    new RegExp(str);
    return true;
  } catch {
    return false;
  }
}
