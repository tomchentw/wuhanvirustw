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

export function getSortedCompanyNameCountPairList(rawData) {
  const countBySlugName = new Map();
  rawData.forEach((list, index) => {
    if (index < 2 || !isValidName(list[1])) {
      return;
    }
    const company = toSlug(list[1]);
    countBySlugName.set(company, 1 + (countBySlugName.get(company) || 0));
  });
  return [...countBySlugName.entries()].sort((a, b) => b[1] - a[1]);
}
