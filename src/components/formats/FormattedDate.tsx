import { formatDateTime } from "@/utils/DateUtils";
import React from "react";

interface Props {
    date: Date;
}

function FormattedDate({date}: Props) {
  return <span>{formatDateTime(date)}</span>;
}

export default FormattedDate;
