"use client";

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { LabelAndValue } from "@/types/Common";

export type BreadcrumbType = LabelAndValue<string | undefined>[];

interface Props {
  items: BreadcrumbType;
}

function Breadcrumb({ items }: Props) {
  return (
    <div className="flex flex-col mt-6 ">
      <Breadcrumbs className="mx-3 poppins font-semibold text-[#8e59a8]"  size="md">
        {items.map((item, index) => (
          <BreadcrumbItem
            isCurrent={index == items.length - 1}
            key={item.value ?? item.label}
            href={item.value}
            isLast={index == items.length - 1}
          >
            {item.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
