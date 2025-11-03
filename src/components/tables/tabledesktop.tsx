"use client"

import React, {useEffect, useState } from 'react'
import Dropdown from '../filters/dropdowntable';
import { Search } from '../filters/search';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Table, useReactTable } from '@tanstack/react-table';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiChevronUp } from 'react-icons/fi';
import DropdownTable from '../filters/dropdowntable';

interface TableProps<TData> {

    data: TData[],
    columns: ColumnDef<TData, undefined>[],
    onSelectionRow?: (table: ReturnType<typeof useReactTable<TData>>) => void;   
}
const TableDesktop = <TData,>(
    {
        data, columns, onSelectionRow
    }: TableProps<TData>
) => {
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex:0,
        pageSize:10
    })

    const table = useReactTable({
            data,
            columns,
            state:{globalFilter, sorting, columnFilters, pagination,},
            onGlobalFilterChange: setGlobalFilter,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            getPaginationRowModel:getPaginationRowModel(),
            onPaginationChange:setPagination,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            enableRowSelection: true
        })
    useEffect(() => {
        onSelectionRow?.(table)
    },[table])
    return (
        <div className="w-full">
            {/* Filter & Search */ }
            <div className={'flex justify-between items-center'}>
                <div className={`flex items-center gap-2 text-button-primary p-2`}>
                    <span className={`text-sm font-bold`}>Show</span>
                    <DropdownTable
                        options={[10, 20, 50, 100, "All"]}
                        value={pagination.pageSize === data.length ? "All" : pagination.pageSize}
                        onChange={(val) => {
                            const size = val === "All" ? data.length : Number(val);
                            setPagination((old) => ({ ...old, pageSize: size }));
                        }}
                        placeholder="Pilih Data"
                        width='w-30'
                    />
                    <span className={`text-sm font-semibold`}>Entries</span>
                </div>
                <div className='flex items-center gap-4 text-button-primary p-2'>
                    <Search 
                        placeholder='Cari data (nama, jenis, portfolio ...)'
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className={`overflow-x-auto border rounded-lg bg-indigo-100 shadow-sm p-2`}>
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                            key={header.id}
                            className="text-center px-4 py-2 text-sm font-semibold text-button-primary 
                            border-b cursor-pointer select-none"
                            onClick={header.column.getToggleSortingHandler()}
                            >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === 'asc' && (
                                <FiChevronUp className="inline ml-1 text-gray-500" size={14} />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                                <FiChevronDown className="inline ml-1 text-gray-500" size={14} />
                            )}
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                        <td colSpan={columns.length} className="text-center py-6 text-button-secondary">
                            Tidak ada data
                        </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition">
                            {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2 text-sm text-gray-800 border-b">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                            ))}
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm font-semibold text-button-primary">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex gap-2">
                    {/* First Page */}
                    <button
                        className="p-2 bg-white rounded-full shadow cursor-pointer
                        hover:bg-button-primary hover:text-white disabled:opacity-80 transition"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        >
                        <FiChevronsLeft size={18} />
                    </button>
                    {/* Previous Page */}
                    <button
                        className="p-2 rounded-full bg-white shadow cursor-pointer
                        hover:bg-button-primary hover:text-white disabled:opacity-80 transition"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        <FiChevronLeft size={18} />
                    </button>
                    {/* Next Page */}
                    <button
                        className="p-2 rounded-full bg-white shadow cursor-pointer
                        hover:bg-button-primary hover:text-white disabled:opacity-80 transition"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                        <FiChevronRight size={18} />
                    </button>
                    {/* Last Page */}
                    <button
                        className="
                        p-2 rounded-full bg-white shadow cursor-pointer
                        hover:bg-button-primary hover:text-white disabled:opacity-80 transition"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        >
                        <FiChevronsRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TableDesktop
