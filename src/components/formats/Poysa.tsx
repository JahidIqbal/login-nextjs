import { cn } from "@/utils/CssUtils";
import { formatPoysa } from "@/utils/PoysaUtil";
import React from "react";

interface Props {
  value: number | string;
  className?: string;
}

function Poysa({ value, className }: Props) {
  const formatted = typeof value == "string" ? value :  formatPoysa(value);
  return (
    <div className={cn("flex justify-end text-right", className)}>
      <span className="text-right">{formatted}</span>
    </div>
  );
}

export default Poysa;
