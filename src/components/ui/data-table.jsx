"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Power,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTable({
  title,
  description,
  data = [],
  columns = [],
  pagination = {},
  isLoading = false,
  onPageChange = () => {},
  onSearch = () => {},
  onAdd = () => {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onRestore = () => {},
  onToggleStatus = () => {},
  searchPlaceholder = "Cari data...",
  addButtonText = "Tambah Data",
  showAddButton = true,
  showActions = true,
  searchValue = "",
}) {
  // Pastikan data adalah array
  const safeData = Array.isArray(data) ? data : [];

  const handleSearch = (value) => {
    onSearch(value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      onPageChange(page);
    }
  };

  const renderTableSkeleton = () => {
    const skeletonRows = Array.from({ length: 5 }, (_, index) => (
      <tr key={index} className="border-b">
        {columns.map((_, colIndex) => (
          <td key={colIndex} className="py-3 px-4">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
        {showActions && (
          <td className="py-3 px-4">
            <Skeleton className="h-8 w-8 rounded" />
          </td>
        )}
      </tr>
    ));

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 font-semibold">
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>{skeletonRows}</tbody>
        </table>
      </div>
    );
  };

  const renderPagination = () => {
    if (!pagination.last_page || pagination.last_page <= 1) return null;

    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;
    const pages = [];

    // Previous button
    pages.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );

    // Page numbers
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(lastPage, currentPage + 2);
      i++
    ) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
        >
          {i}
        </Button>
      );
    }

    // Next button
    pages.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Menampilkan {pagination.from || 0} - {pagination.to || 0} dari{" "}
          {pagination.total || 0} data
        </div>
        <div className="flex items-center space-x-2">{pages}</div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
                disabled={isLoading}
              />
            </div>
            {showAddButton && (
              <Button onClick={onAdd} disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                {addButtonText}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          renderTableSkeleton()
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="text-left py-3 px-4 font-semibold"
                    >
                      {column.header}
                    </th>
                  ))}
                  {showActions && (
                    <th className="text-left py-3 px-4 font-semibold">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {safeData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (showActions ? 1 : 0)}
                      className="text-center py-8 text-gray-500"
                    >
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  safeData.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-b hover:bg-gray-50"
                    >
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="py-3 px-4">
                          {column.render
                            ? column.render(item, index)
                            : item[column.accessor]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onView(item)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onEdit(item)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onToggleStatus(item)}
                              >
                                <Power className="h-4 w-4 mr-2" />
                                {item.is_active ? "Nonaktifkan" : "Aktifkan"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {item.deleted_at ? (
                                <DropdownMenuItem
                                  onClick={() => onRestore(item)}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Restore
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => onDelete(item)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {renderPagination()}
      </CardContent>
    </Card>
  );
}
