export function formatPoysa(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(createTk(value));
}

export function createTk(value: number) {
  return value / 100;
}

export function createTkForForms(value: number | undefined) {
  if (value == undefined) return undefined;

  return createTk(value ?? 0);
}

export function createPoysaForApi(value: number | undefined ) {
  if (value == undefined) return undefined;

  const tk = typeof value == "string" ? parseInt(value) : value;
  return tk * 100;

}
