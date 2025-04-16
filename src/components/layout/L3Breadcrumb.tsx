"use client";

import React from "react";
import Breadcrumb from "./Breadcrumb";

interface Props {
  midLabel: string;
  midUrl?: string;
  lastLabel?: string;
}

function L3Breadcrumb({midLabel, midUrl, lastLabel} : Props) {
  return (
    <Breadcrumb items={[
      { label: "Dashboard", value: "/dashboard" },
      { label: midLabel, value: lastLabel ? midUrl : undefined },
      ... lastLabel ? [{ label: lastLabel, value: undefined }] : [],
    ]} />
  )
}

export default L3Breadcrumb
