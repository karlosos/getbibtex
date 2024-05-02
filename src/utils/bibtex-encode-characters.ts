export function encodeCharactersInBibTex(str: string): string {
  return str
    .replace(/([A-Z])/g, "{$1}")
    .replace(/&/g, "\\&")
    .replace(/\$/g, "\\$")
    .replace(/\_/g, "\\_");
}
