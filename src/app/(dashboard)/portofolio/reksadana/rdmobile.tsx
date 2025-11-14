'use client'
import { fetchDataReksadana } from '@/hooks/services/fetchdatatablerd'
import { IDataTableRD } from '@/models/idatatablerd'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import loadingAnim from '../../../../../public/lottie/Loading40_Paperplane.json'
import CardMobileNoData from '@/components/cards/cmnodata'
import Dropdown from '@/components/filters/dropdown'
import DatePickerField from '@/components/filters/datepicker'
import StickyAddMobile from '@/components/buttons/buttonStickyaddmobile'
import DataList from '@/components/lists/datalist'
import { MdMoreVert } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { Search } from '@/components/filters/search'
import { FaPrint } from 'react-icons/fa6'
import ModalAction from '@/components/modals/action'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const ReksadanaMobile = () => {
    const [data, setData] = useState<IDataTableRD[]>([])
    const [selectedItem, setSelectedItem] = useState<IDataTableRD|null>(null)
    const [filteredData, setFilteredData] = useState<IDataTableRD[]>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const [openAction, setOpenAction] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedPembelian, setSelectedPembelian] = useState<string | number>()
    const [selectedJenis, setSelectedJenis] = useState<string|number>()
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
    const router = useRouter() 

    useEffect(() => {
        const loadData = async () => {
        const result = await fetchDataReksadana(setError, setLoading)
            setData(result)
            setFilteredData(result)
        }
        loadData()
    }, [])

    useEffect(() => {
        try {
            if(!globalFilter.trim()) {
                setFilteredData(data)
                return
            }
            const lowersearch = globalFilter.toLowerCase()
            const search = data.filter(item => 
                item.nama.toLowerCase().includes(lowersearch) || item.jenis.toLowerCase().includes(lowersearch) ||
                item.nominal.toLocaleString().includes(lowersearch) || item.tipe.toLowerCase().includes(lowersearch) ||
                item.portfolio.toLowerCase().includes(lowersearch) || item.tanggal.toLocaleString().includes(lowersearch)           
            )
            setFilteredData(search)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unexpected error during filtering")
            }
        }
    },[globalFilter,data])

    const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const padding = 8; // jarak dari tepi viewport

        // Hitung width modal dulu
        const minWidth = 240;
        const defaultWidth = rect.width * 1.5;
        const maxWidth = window.innerWidth - 2 * padding;
        const width = Math.min(Math.max(defaultWidth, minWidth), maxWidth);

        // Hitung posisi left supaya masuk viewport
        let left = rect.left + window.scrollX;
        if (left + width > window.innerWidth - padding) {
            left = window.innerWidth - width - padding;
        }
        if (left < padding) left = padding;

        // Set style
        setModalStyle({
            position: "absolute",
            top: rect.bottom + window.scrollY + 4,
            left,
            width,
            minWidth,
            maxWidth,
            overflow: "auto",
            zIndex: 1000,
            padding:'2'
        });

        setOpenAction(true);
    };

    const Pembelian = [
        { Value: "Pembelian", Text: "Pembelian" },
        { Value: "Penjualan", Text: "Penjualan" },
        { Value: "Dividen", Text: "Dividen" }
    ];

    const Jenis = [
        {text:'Pasar Uang', value:'Pasar Uang'},
        {text:'Obligasi', value:'Obligasi'},
        {text:'Saham', value:'Saham'}
    ]

    const handleEdit = (item: IDataTableRD) => {
        setSelectedItem(item)
        if(selectedItem) {
            router.push(`/portofolio/reksadana/edit/${selectedItem.id}`)
        }
    }

    const handleDelete = (item:IDataTableRD) => {
        setSelectedItem(item)
    }

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

    if(data.length === 0) {
        return (
            <CardMobileNoData
                label='Lu Belum Input Data di Reksadana samsek anjayyy, Sebaiknya jangan Gegabah'
                buttonlabel='Create New Reksadana'
                redirectTo='portofolio/reksadana/add'
            />
        )
    }
    return (
        <div className={`flex flex-col gap-1 pb-2`}>
            <div className='flex flex-row px-2 pt-2 gap-2'>
                <Search 
                    placeholder='Cari data (nama, jenis, portfolio ...'
                    value={globalFilter ?? ""}
                    onClick={(query) => setGlobalFilter(query)}
                    //onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <button className='p-2 border bg-button-primary text-white rounded-lg'>
                    <FaPrint size={20}/>
                </button>
            </div>
            <div className={`flex flex-row w-full max-w-screen`}>
                <div className={`flex flex-1 p-2 items-center justify-center min-w-0`}>
                    <Dropdown
                        options={Pembelian}
                        textField="Text"
                        valueField="Value"
                        value={selectedPembelian}
                        onChange={(val, item) => {
                            console.log("Selected:", val);
                            console.log("select Item: ",item)
                            setSelectedPembelian(val);
                        }}
                        placeholder="Tipe"
                    />
                </div>
                <div className={`flex flex-1 p-2 items-center justify-center min-w-0`}>
                    <Dropdown
                        options={Jenis}
                        textField={"text"}
                        valueField={"value"}
                        value={selectedJenis}
                        onChange={(val, item) => {
                            console.log("selected sort: ", val, item)
                            setSelectedJenis(val)
                        }}
                        placeholder='Jenis'
                    />
                </div>
                <div className={`flex flex-1 items-center justify-center p-2 min-w-0`}>
                    <DatePickerField
                        placeholder='Date'
                        value={selectedDate}
                        onChange={setSelectedDate}
                        formatDate={(date) =>
                            date ? date.toISOString().split("T")[0] : "" // 👉 yyyy-mm-dd
                        }
                    />
                </div>
            </div>
            {selectedDate && (
                <p className="mt-4 text-gray-700 px-2">
                    Kamu pilih: {selectedDate.toISOString().split("T")[0]}
                </p>
            )}
            {selectedPembelian && (
                <p className="mt-4 text-gray-700 px-2">
                    Kamu pilih: {selectedPembelian}
                </p>
            )}
            {selectedJenis && (
                <p className="mt-4 text-gray-700 px-2">
                    Kamu pilih: {selectedJenis}
                </p>
            )}
            <div className='flex px-2 w-full max-w-screen'>
                <DataList 
                    items={filteredData}
                    renderItem={(data) => (
                        <div className='flex flex-col justify-center border rounded-xl border-button-primary'>
                            {/* HEADER */}
                            <div className='flex flex-row gap-2 font-bold border-b p-2 border-button-primary'>
                                <span className='flex flex-2'>{data.portfolio}</span>
                                <button 
                                    className='flex flex-1 justify-end'
                                    onClick={(e) => {
                                        openModal(e)
                                        setSelectedItem(data)
                                    }}>
                                    <MdMoreVert size={20} color="#555" />
                                </button>
                            </div>
                            <div className='flex flex-row gap-2 font-medium p-2 items-center'>
                                <div className="h-8 w-8 rounded-full bg-button-secondary 
                                    flex items-center justify-center text-white font-bold text-sm">
                                    {(data.nama as string)?.charAt(0).toUpperCase()}
                                </div>
                                <div className='flex flex-col flex-2 gap-1'>
                                    <span className='flex'>{data.nama}</span>
                                    <span className='text-sm font-medium'>{data.jenis}</span>
                                </div>
                                <div className='flex py-2 font-normal'>
                                    {data.tipe === "PEMBELIAN" ? (
                                        <div className='flex flex-row p-2 rounded-xl bg-green-200 text-xs justify-between items-center'>
                                            <RxDotFilled className="w-5 h-5" />
                                            {data.tipe}
                                        </div>
                                    ) : data.tipe === "DIVIDEN" ? (
                                        <div className='flex flex-row p-2 rounded-xl bg-indigo-200 text-xs justify-between items-center'>
                                            <RxDotFilled className="w-5 h-5" />
                                            {data.tipe}
                                        </div>
                                    ) : (
                                        <div className='flex flex-row p-2 rounded-xl bg-red-200 text-xs justify-between items-center'>
                                            <RxDotFilled className="w-5 h-5" />
                                            {data.tipe}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 font-medium px-2'>
                                <span className='flex flex-2'>Tanggal Transaksi</span>
                                <span className='flex flex-1 justify-end'>
                                    {data.tanggal instanceof Date ?
                                        data.tanggal.toISOString().split('T')[0] :
                                        new Date(data.tanggal).toISOString().split('T')[0]}
                                </span>
                            </div>
                            <div className='flex flex-row gap-2 font-medium px-2'>
                                <span className='flex flex-2'>Nilai</span>
                                <span className='flex flex-1 justify-end'>
                                    {(data.nominal as number).toLocaleString("id-ID")}
                                </span>
                            </div>
                            <div className='flex flex-row gap-2 font-medium px-2'>
                                <span className='flex flex-2'>NAV</span>
                                <span className='flex flex-1 justify-end'>{(data.nav as number).toLocaleString("en-US")}</span>
                            </div>
                            <div className='flex flex-row gap-2 font-medium px-2 pb-2'>
                                <span className='flex flex-2'>Jumlah Unit</span>
                                <span className='flex flex-1 justify-end'>{(data.jumlah_unit as number).toLocaleString("en-US")}</span>
                            </div>
                        </div>
                    )}
                />
                <ModalAction 
                    isOpen={openAction}
                    setIsOpen={setOpenAction}
                    showClose={false}
                    onClose={() => {
                        setOpenAction(false)
                    } }
                    //title='Action'
                    style={modalStyle}>
                    <div className="flex flex-col gap-2 p-2">
                        <button
                            className="flex items-center gap-2 py-2 rounded transition"
                            onClick={() => {
                                if(selectedItem) handleDelete(selectedItem)
                                console.log("data :", selectedItem?.id)
                                console.log("Delete clicked");
                                setOpenAction(false);
                            }}
                        >
                            <FiTrash2 size={18} />
                            <span className="text-sm">Delete</span>
                        </button>
                        <button
                            className="flex items-center gap-2 py-2 rounded transition"
                            onClick={() => {
                                if(selectedItem) handleEdit(selectedItem)
                                console.log("data edit: ", selectedItem)
                                console.log("Edit clicked");
                                setOpenAction(false);
                            }}
                        >
                            <FiEdit2 size={18} />
                            <span className="text-sm">Edit</span>
                        </button>
                    </div>
                </ModalAction>
            </div>
            {/* Bottom Add */}
            <StickyAddMobile
                className={`flex justify-center items-center
                    w-13 h-13
                    bg-button-primary text-white
                    rounded-full
                    shadow-lg
                    active:scale-95
                    transition-transform
                    ${loading ? "cursor-wait":""}`}
                onClick={() => {
                    setLoading(true)
                    router.push(`/portofolio/reksadana/add`)
                    setLoading(false)
            }} />
        </div>
    )
}

export default ReksadanaMobile
