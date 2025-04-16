export function trimCharStart(str: string, charlist: string): string {
  if (charlist === undefined) return str;

  return str.replace(new RegExp(`^[${charlist}]+`), "");
}

export function trimCharEnd(str: string, charlist: string): string {
  if (charlist === undefined) return str;

  return str.replace(new RegExp(`[${charlist}]+$`), "");
}

export function trimChar(str: string, charlist: string): string {
  let r = trimCharStart(str, charlist);
  r = trimCharEnd(r, charlist);
  return r;
}

export function ucFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string): string {
  return str.toLowerCase().split(" ").map(ucFirst).join(" ");
}

export function snakeCase(str: string): string {
  return str?.toLowerCase().split(" ").join("_");
}

export function normalizeSnakeCase(str: string): string {
  return str.split("_").join(" ");
}

export function normalizeCamelCase(str: string): string {
  return str
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, (match) => match.toUpperCase()) 
}

export function abbreviate(str: string, maxLength = 30): string {
  return `${str.substring(0, maxLength)}...`;
}

export function insertAt(src: string, position: number, target: string) {
  return src.slice(0, position) + target + src.slice(position);
}

export function truncateText(
  text: string | null | undefined,
  maxLength: number
): string {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text ?? "-";
}

export function padId(id: string | number | null) {
  return id?.toString().padStart(3, "0") ?? "";
}

export function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isValidJSON(str: string | undefined | null): boolean {
  if (!str) return false;
  
  try {
      JSON.parse(str);
      return true;
  } catch (e) {
      return false;
  }
}
