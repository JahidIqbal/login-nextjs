import { LabelAndValue, PageProp, Range, RangeInUrl } from "@/types/Common";
import { trimChar } from "./StringUtils";

export async function addPageQueryForApi(
  uri: string,
  { searchParams }: PageProp
) {
  const params = await searchParams;
  const page = params?.page;

  if (page == undefined) return uri;

  return addQuery(uri, [{ label: "page", value: (page - 1).toString() }]);
}

export function addPageQuery(uri: string, page?: number) {
  if (page == undefined) return uri;

  return addQuery(uri, [{ label: "page", value: page.toString() }]);
}

export function joinUrlPaths(part1: string, part2: string) {
  return `${trimChar(part1, "/")}/${trimChar(part2, "/")}`;
}

type Params = object | LabelAndValue<string | undefined>[] | undefined;

export function addQuery(uri: string, params: Params) {
  if (params == undefined) return uri;

  const splitted = uri.split('?');
  const urlParams = new URLSearchParams(splitted.length == 1 ? '' : `?${splitted[1]}`);

  convertParamsToLabelValue(params).forEach((p) => {
    if (p.value) urlParams.set(p.label, p.value);
  });

  return `${splitted[0]}${urlParams.size > 0 ? "?" : ""}${urlParams.toString()}`;
}

function convertParamsToLabelValue(
  params: Params
): LabelAndValue<string | undefined>[] {
  if (params == undefined) return [];

  if (Array.isArray(params)) {
    return params;
  }

  return Object.entries(params).map(([ok, ov]) => {
    return { label: ok, value: ov?.toString() };
  });
}

export function convertUrlDateRange(r?: RangeInUrl): Range<Date> {
  const getDate = (s?: string) => s ? new Date(s) : new Date();

  return {
    min: getDate(r!.start),
    max: getDate(r!.end),
  }
}
