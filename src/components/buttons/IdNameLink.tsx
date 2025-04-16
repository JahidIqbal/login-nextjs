import { IdAndName } from "@/types/Common";
import { joinUrlPaths } from "@/utils/UrlUtil";
import { Link } from "@heroui/react";
import React from "react";

interface Props {
  baseUrl: string;
  data: IdAndName;
}

function IdNameLink({ baseUrl, data }: Props) {
  return (
    <Link underline="hover" href={joinUrlPaths(baseUrl, data.id.toString())}>
      {data.name}
    </Link>
  );
}

export default IdNameLink;
