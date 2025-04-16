"use client";

import React, { ReactNode, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";
import { Pagination as PaginationType } from "@/types/Common";
import { useRouter, usePathname } from "next/navigation";
import { addPageQuery } from "@/utils/UrlUtil";

interface Props<T> {
  heads: {
    [k in keyof T]?: string;
  };
  dataKey: keyof T;
  data: T[];
  pagination?: PaginationType;
  renderers?: {
    [k in keyof T]?: (item: T) => ReactNode;
  };
  actionRenderer?: (item: T) => ReactNode;
}

const actionCellKey = "actions";

export default function DataTable<T>({
  heads,
  dataKey,
  data,
  pagination,
  renderers,
  actionRenderer,
}: Readonly<Props<T>>) {
  const router = useRouter();
  const pathname = usePathname();

  const renderCell = useCallback((item: T, columnKey: string) => {
    if (columnKey == actionCellKey && actionRenderer)
      return actionRenderer(item);

    const key = columnKey as keyof T;

    return renderers && key in renderers
      ? renderers[key]!(item)
      : getKeyValue(item, columnKey);
  }, []);

  const getTotalPageCount = useCallback((pagination: PaginationType) => {
    const calculatedTotalPages = Math.ceil(pagination.totalcount / pagination.currentpagetotalcount);
    return pagination.hasnext ? calculatedTotalPages : pagination.currentpage + 1;
  }, []);

  const getCurrentCountText = useCallback((pagination: PaginationType) => {
    const currentPageCount = Math.min(
      pagination.totalcount,
      pagination.currentpagetotalcount
    );

    return `Showing ${currentPageCount} of ${pagination.totalcount} records`;
  }, []);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        pagination == undefined ? null : (
          <div className="flex w-full justify-between">
            <h1 className="">{getCurrentCountText(pagination)}</h1>
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              page={pagination.currentpage + 1}
              total={getTotalPageCount(pagination)}
              onChange={(page) => router.push(addPageQuery(pathname, page))}
              isDisabled={!pagination.hasnext && pagination.currentpage === getTotalPageCount(pagination)}
            />
          </div>
        )
      }
      classNames={{
        wrapper: "p-0 shadow-none min-h-[222px]",
      }}
    >
      <TableHeader>
        <>
          {Object.entries(heads).map(([k, v]) => (
            <TableColumn key={k}>{v as string}</TableColumn>
          ))}
          {actionRenderer && (
            <TableColumn key={actionCellKey}>Actions</TableColumn>
          )}
        </>
      </TableHeader>
      <TableBody items={data} emptyContent={"No data found."}>
        {(item) => (
          <TableRow key={item[dataKey] as string}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
