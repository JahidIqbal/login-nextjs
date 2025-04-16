export function getPayloadFromJWT(token:string) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    return JSON.parse(atob(parts[1]));
  }