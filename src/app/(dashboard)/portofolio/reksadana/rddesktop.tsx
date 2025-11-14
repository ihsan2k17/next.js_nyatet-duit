"use client"

import { IDataTableRD } from '@/models/idatatablerd'
import { ColumnDef, Table } from '@tanstack/react-table'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import loadingAnim from '../../../../../public/lottie/Loading40_Paperplane.json'
import { fetchDataReksadana } from '@/hooks/services/fetchdatatablerd'
import TableDesktop from '@/components/tables/tabledesktop'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import CardDesktopNoData from '@/components/cards/cdnodata'

const ReksadanaDesktop = () => {
    const [data, setData] = useState <IDataTableRD[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tableInstance, setTableInstance] = React.useState<Table<IDataTableRD> | null>(null);
    const router = useRouter()
    interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
    const RoundedCheckbox = ({ ...props }: Props) => {
        return (
            <label className="relative flex items-center cursor-pointer select-none">
                <input type="checkbox" className="sr-only peer" {...props} />

                <div
                    className="
                    w-5 h-5 
                    rounded-md border
                    transition-all duration-200 
                    flex items-center justify-center
                    hover:border-button-secondary hover:shadow-sm
                    peer-checked:bg-button-secondary 
                    peer-checked:border-button-secondary
                    peer-checked:[&_svg]:opacity-100
                    peer-checked:[&_svg]:scale-100
                    "
                >
                    <FaCheck
                    className="
                        text-white text-xs font-bold
                        opacity-0 scale-75
                        transition-all duration-200
                    "
                    />
                </div>
            </label>
        );
    };

    const columns: ColumnDef<IDataTableRD>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <RoundedCheckbox
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <RoundedCheckbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
        {
            header: "Nama",
            accessorKey: "nama",
            cell: ({ getValue }) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-button-secondary 
                        flex items-center justify-center text-white font-bold text-sm">
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
            cell: ({row}) => (
                <div className="flex gap-3 text-gray-500">
                    <FiEdit2 
                        className="cursor-pointer hover:text-blue-600" 
                        onClick={() => {
                            const id = row.original.id
                            console.log("data id: ",id)
                            router.push(`/portofolio/reksadana/edit/${row.original.id}`)
                        }}/>
                    <FiTrash2 
                        className="cursor-pointer hover:text-red-500" 
                        onClick={() => {
                            if(!tableInstance) return
                            const selected = tableInstance.getSelectedRowModel().rows.map((r) => 
                                r.original.id)
                            if(selected.length > 0) {
                                console.log("sekali hapus banyak: ", selected)
                            } else {
                                console.log("data id: ", row.original.id)
                            }                            
                        }}/>
                </div>
            ),
        },
    ]
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

    if(data.length === 0 ) {
        return (
            <CardDesktopNoData 
                label='Lu Belum Input Data di Reksadana samsek anjayyy, Sebaiknya jangan Gegabah'
                buttonlabel='Create New Reksadana'
                redirectTo='portofolio/reksadana/add' />
        )
    }

    return (
        <div className={`p-2 ${loading ? "cursor-wait":"cursor-auto"}`}>
            <div className="flex flex-col justify-center items-start mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    Data Portfolio Reksadana
                </h2>
                <button className={`flex flex-row gap-4 justify-center items-center 
                    bg-button-primary p-2.5 px-5 rounded-2xl cursor-pointer
                    text-sm font-bold text-white`}>
                    <span 
                        onClick={() => {
                            setLoading(true)
                            router.push(`/portofolio/reksadana/add`)
                        }}>
                        Create Data 
                    </span>
                    <FaPlus /> 
                </button>
            </div>
            <TableDesktop 
                data={data} 
                columns={columns} 
                onSelectionRow={setTableInstance}/>
        </div>
    )
}

export default ReksadanaDesktop
