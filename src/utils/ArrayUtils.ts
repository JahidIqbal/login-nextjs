import {
  IdAndName,
  LabelAndValue,
  SelectedLabelAndValue,
} from "@/types/Common";

export function arrayLast<T>(array: Array<T>) {
  return array[array.length - 1];
}

export function range(size: number, startAt = 1) {
  return Array(size)
    .fill(0)
    .map((v, i) => i + startAt);
}

export function addOrRemove<T>(
  arr: Array<T>,
  el: T,
  fn?: (item: T) => boolean
) {
  const idx = fn ? arr.findIndex(fn) : arr.indexOf(el);
  if (idx >= 0) {
    arr.splice(idx, 1);
  } else {
    arr.push(el);
  }
  return [...arr];
}

export function remove<T>(arr: Array<T>, el?: T, fn?: (item: T) => boolean) {
  const idx = fn ? arr.findIndex(fn) : arr.indexOf(el!);

  if (idx >= 0) {
    arr.splice(idx, 1);
  }

  return [...arr];
}

export function setSelectedStateInLabelValueArray(
  all: LabelAndValue[],
  selected: LabelAndValue[]
): SelectedLabelAndValue[] {
  const selectedMap: Record<string, boolean> = selected.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.value]: true,
    };
  }, {});

  return all.map((item) => {
    return {
      ...item,
      isSelected: selectedMap[item.value] ?? false,
    };
  });
}

export function enumToLabelValue<T extends { [key: string]: string | number }>(
  e: string
): LabelAndValue<T[keyof T]> {
  return {
    label: e,
    value: e as unknown as T[keyof T],
  };
}

export function enumToLabelValueArray<
  T extends { [key: string]: string | number }
>(e: T): Array<LabelAndValue<T[keyof T]>> {
  return Object.values(e)
    .filter((r) => typeof r == "string")
    .map(enumToLabelValue) as Array<LabelAndValue<T[keyof T]>>;
}

export function idNameToLabelValue(v: IdAndName): LabelAndValue<number> {
  return { label: v.name, value: v.id };
}

export function idNameToLabelValueString(v: IdAndName): LabelAndValue {
  return { label: v.name, value: v.id.toFixed() };
}

export function enumToLabelValueAndRemoveUnderscores<T extends { [key: string]: string | number }>(
  e: string
): LabelAndValue<T[keyof T]> {
  return {
    label: e.replace("_", " "),
    value: e as unknown as T[keyof T],
  };
}

export function enumToLabelValueArrayAndRemoveUnderscores<
  T extends { [key: string]: string | number }
>(e: T): Array<LabelAndValue<T[keyof T]>> {
  return Object.values(e)
    .filter((r) => typeof r == "string")
    .map(enumToLabelValueAndRemoveUnderscores) as Array<LabelAndValue<T[keyof T]>>;
}
