"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableCaption,
} from "./table";
import { cn } from "../../utils/classNames";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const EnhancedTable = ({
  data = [],
  columns = [],
  caption,
  isLoading = false,
  pagination = true,
  onRowClick,
  onSelectionChange,
  className,
  emptyState = "No data available",
  searchQuery = "",
  isChecked = true,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, sortConfig]);

  // Get current page data
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedData, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);

  // Reset page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle row selection
  const handleRowSelect = (id, checked) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      onSelectionChange?.(Array.from(newSet));
      return newSet;
    });
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    const newSelected = checked
      ? new Set(currentData.map((row) => row.id))
      : new Set();
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  // Check if all current page items are selected
  const isAllSelected =
    currentData.length > 0 &&
    currentData.every((row) => selectedRows.has(row.id));

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative overflow-x-auto">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {isChecked && (
                <TableHead className="w-[50px] whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    className="h-4 w-4 rounded border-gray-300"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="whitespace-nowrap font-normal text-xs"
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ cursor: column.sortable ? "pointer" : "default" }}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="inline-block">
                        {sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  {emptyState}
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    selectedRows.has(row.id) && "bg-muted/50"
                  )}
                >
                  {isChecked && (
                    <TableCell className="w-[50px]">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={(e) =>
                          handleRowSelect(row.id, e.target.checked)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className="whitespace-nowrap text-darkBlueText text-sm font-medium"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, processedData.length)} of{" "}
            {processedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTable;
