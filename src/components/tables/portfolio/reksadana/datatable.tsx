'use client'
import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table'
import { IDataTableRD } from '@/models/idatatablerd'
import Lottie from 'lottie-react'
import loadingAnim from '../../../../../public/lottie/Loading40_Paperplane.json'
import { fetchDataReksadana } from '@/hooks/services/fetchdatatablerd'
import { FiChevronDown, FiChevronUp, FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/filters/dropdowntable'
import { Search } from '@/components/filters/search'


const Datatablerd = () => {
    const [data, setData] = useState <IDataTableRD[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex:0,
        pageSize:10
    })
    const columns: ColumnDef<IDataTableRD>[] = [
    {
        header: "Nama",
        accessorKey: "nama",
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-button-primary font-bold text-sm">
                {(getValue() as string)?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-800">{getValue() as string}</span>
            </div>
        ),
        },
    {
        header: "Jenis",
        accessorKey: "jenis",
    },
    {
        header: "Portfolio",
        accessorKey: "portfolio",
    },
    {
        header: "Level",
        accessorKey: "level",
    },
    {
        header: "Tanggal",
        accessorKey: "tanggal",
        cell: ({ getValue }) =>
            new Date(getValue() as string).toLocaleDateString("id-ID"),
    },
    {
        header: "Tahun",
        accessorKey: "tahun"
    },
    {
        header: "Nominal",
        accessorKey: "nominal",
        cell: ({ getValue }) =>
            (getValue() as number).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            }),
    },
    {
        header: "NAV",
        accessorKey: "nav",
        cell: ({ getValue }) =>
            (getValue() as number).toLocaleString("id-ID"),
    },
    {
        header: "Jumlah Unit",
        accessorKey: "jumlah_unit",
    },
    {
        header: "Tipe",
        accessorKey: "tipe",
        cell: ({ getValue }) => {
            const tipe = getValue() as string
            const color =
            tipe === "PEMBELIAN"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                {tipe}
            </span>
            )
        },
    },
    {
        header: "Aksi",
        cell: () => (
            <div className="flex gap-3 text-gray-500">
            <FiEdit2 className="cursor-pointer hover:text-blue-600" />
            <FiTrash2 className="cursor-pointer hover:text-red-500" />
            </div>
        ),
    },
    ]

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
    })
    useEffect(() => {
        const loadData = async () => {
        const result = await fetchDataReksadana(setError, setLoading)
        setData(result)
        }
        loadData()
    }, [])
    
    if (loading) {
        return (
        <div className="flex justify-center items-center h-72">
            <Lottie animationData={loadingAnim} loop style={{ width: 180, height: 180 }} />
        </div>
        )
    }

    if (error) {
        return (
        <div className="text-center text-red-600 font-semibold py-6">
            Error: {error}
        </div>
        )
    }
    return (
        <div className="overflow-x-auto border rounded-lg bg-indigo-100 shadow-sm p-4">
            {/* 🔍 Simple search filter */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Data Portfolio Reksadana
                </h2>
            </div>
            {/* show row */ }
            <div className={'flex justify-between items-center mb-2'}>
                <div className={`flex items-center gap-4 text-button-primary p-2`}>
                    <span className={`text-sm font-bold`}>Show</span>
                    <Dropdown
                        options={[10, 20, 50, 100, "All"]}
                        value={pagination.pageSize === data.length ? "All" : pagination.pageSize}
                        onChange={(val) => {
                            const size = val === "All" ? data.length : Number(val);
                            setPagination((old) => ({ ...old, pageSize: size }));
                        }}
                        placeholder="Jumlah data"
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
            <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                        key={header.id}
                        className="text-center px-4 py-2 text-sm font-semibold text-gray-600 
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
                    <td colSpan={columns.length} className="text-center py-6 text-gray-500">
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
    )
}

export default Datatablerd
