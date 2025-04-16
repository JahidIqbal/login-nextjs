"use client";

import { cn } from "@/utils/CssUtils";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface Props {
  printId?: string;
  title?: string;
  children: ReactNode;
  rightBtn?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
}

function PageContainer({
  printId,
  title,
  rightBtn,
  children,
  collapsible = false,
  collapsed = false,
}: Props) {
  const isCollapsible = collapsible || collapsed;

  const [isExpanded, setIsExpanded] = useState(!collapsed);

  const showHeader = title != undefined || rightBtn != undefined || isCollapsible;

  const toggleExpand = () => {
    if (!isCollapsible) return;

    setIsExpanded((c) => !c);
  };

  const collapseIcon = (() => {
    if (!isCollapsible) return null;

    return isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />;
  })();

  return (
    <div
      className={cn("bg-[#FFFFFF] m-6 rounded-xl p-6 text-[#3F4254]", {
        "shadow-md": printId == undefined,
      })}
      id={printId}
    >
      {showHeader && (
        <div
          className={cn("flex justify-between items-center mb-4", {
            "cursor-ns-resize": isCollapsible,
          })}
          onClick={toggleExpand}
        >
          <div>{title && <h1 className="poppins">{title}</h1>}</div>
          <div className="flex items-center gap-2">
            {rightBtn}
            {collapseIcon}
          </div>
        </div>
      )}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PageContainer;
