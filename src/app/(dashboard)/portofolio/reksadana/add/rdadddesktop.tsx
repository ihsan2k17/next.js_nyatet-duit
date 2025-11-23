'use client'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import loadingAnim from '../../../../../../public/lottie/Loading40_Paperplane.json'
import MobileDatePicker from '@/components/ui/mobiledatepicker'
import { FaCalendarAlt, FaRegCalendarAlt } from 'react-icons/fa'
import TextFields from '@/components/ui/textfields'
import { FaFileCsv, FaFileExcel, FaUser } from 'react-icons/fa6'
import ModalAction from '@/components/modals/action'
import UIMblDropdown from '@/components/ui/uimbldropdown'
import { fetchDDLreksadana } from '@/hooks/services/fetchddlreksadana'
import { useRouter } from 'next/navigation'

const RDAddDesktop = () => {
    const router = useRouter() 
    const [loading, setLoading] = useState(false)
    const [selectedTgl, setSelectedTgl] = useState<Date | null>(null)
    const [ddlProdukRD, setDDLProdukRD] = useState([])
    const [selectedRDProduk, setSelectedRDProduk] = useState<string|number>()
    const [selectedPembelian, setSelectedPembelian] = useState<string|number>()
    const [ddlportfolio, setDDLportfolio] = useState([])
    const [selectedPortfolio, setSelectedPortfolio] = useState<number|string>("")
    const [selectedNamaPortfolio, setSelectedNamaPortfolio] = useState<string|number>("")
    const [ddlRekRDN, setDDLRekRDN] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] =useState<"Excel" | "CSV"| null >(null)
    const [error, setError] = useState('')

    const Pembelian = [
        { Value: "Pembelian", Text: "Pembelian" },
        { Value: "Penjualan", Text: "Penjualan" },
        { Value: "Dividen", Text: "Dividen" }
    ]

    useEffect(() => {
        const loadddl = async () => {
            const prod = await fetchDDLreksadana(setLoading, setError, "CEKPRODUKRD")
            setDDLProdukRD(prod)

            const rek = await fetchDDLreksadana(setLoading, setError, "CEKMASTERREKRDN")
            setDDLRekRDN(rek)

            const idport = await fetchDDLreksadana(setLoading, setError, "CEKRDPORTFOLIO")
            setDDLportfolio(idport)
        }
        loadddl()
    },[])

    const getNamaPortf = async (val: string|number) => {
        const data = await fetchDDLreksadana(
            setLoading,setError,"SELECTEDNAMAPORTFOLIO",null, Number(val)
        )
        return data
    }

    if (loading) {
        return (
        <div className="flex justify-center items-center h-72">
            <Lottie animationData={loadingAnim} loop style={{ width: 180, height: 180 }} />
        </div>
        )
    }
    return (
        <div className='flex flex-1 flex-col gap-1 items-center justify-center bg-white'>
            <div className='flex flex-1 p-2 flex-col gap-3 rounded-t-xl w-full'>
                <div className='flex flex-1 w-full items-center justify-start'>
                    <label 
                        className='text-2xl font-semibold text-button-primary text-start'
                        htmlFor="title">Add Transaksi Reksadana</label>
                </div>
                {/* PANEL IMPORT FILE */}
                <div className='flex felx-row gap-5 w-full items-start'>
                    <button 
                        onClick={() => {
                            setOpenModal(true)
                            setModalType('Excel')
                        }}
                        className='
                            flex flex-row gap-3 items-center cursor-pointer
                            bg-emerald-500 rounded-xl 
                            px-5 py-2 
                            font-semibold text-[1rem]
                            text-gray-200'>
                        <FaFileExcel size={18}/>
                        Import Excel
                    </button>
                    <button 
                        onClick={() => {
                            setOpenModal(true)
                            setModalType('CSV')
                        }}
                        className='
                            flex flex-row gap-3 items-center cursor-pointer rounded-xl 
                            px-5 py-2
                            bg-indigo-500 
                            font-semibold text-[1rem]
                            text-gray-200
                            transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'>
                        <FaFileCsv size={18}/>
                        Import CSV
                    </button>
                </div>
                {openModal && (
                    modalType === 'Excel' ? (
                        <ModalAction 
                            isOpen={openModal} 
                            setIsOpen={setOpenModal} 
                            onClose={() => {
                                setOpenModal(false)
                            }}>
                            <div>INI MODAL BUAT EXPORT EXCEL</div>
                        </ModalAction>
                    ) : 
                    modalType === 'CSV' ? (
                        <ModalAction 
                            isOpen={openModal}
                            setIsOpen={setOpenModal}
                            onClose={() => {
                                setOpenModal(false)
                            }}
                        >
                            <div>INI MODAL BUAT EXPORT CSV</div>
                        </ModalAction>
                    ) : null
                )}
                {/* PANEL ADD */}
                <div className='flex flex-row gap-2 pt-5'>
                    {/* panel informasi transaksi */}
                    <div className='flex flex-1 flex-col items-start gap-5 pb-5'>
                        <label className='flex w-[50%] text-button-primary border-b-2 items-start justify-start text-xl font-semibold'>
                            Informasi Transaksi
                        </label> 
                        <div className='flex flex-col gap-8 p-2 w-full'>
                            <div className='flex flex-row gap-3 w-full items-center'>
                                <label htmlFor='tgl' className='flex w-50 font-semibold whitespace-nowrap'>Tgl Transaksi</label>
                                <label>:</label>
                                <MobileDatePicker
                                    placeholder='Pilih Tanggal'
                                    value={selectedTgl}
                                    onChange={setSelectedTgl}
                                    className='flex flex-1 w-80 flex-row gap-3 rounded-xl border items-center
                                        border-gray-300 bg-white px-2 py-1 transition
                                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'
                                    icon={<FaCalendarAlt size={16}/>}
                                    iconPosition='left'
                                    formatDate={(date) =>
                                        date ? date.toISOString().split("T")[0] : "" // 👉 yyyy-mm-dd
                                    } 
                                />
                            </div>
                            <div className='flex flex-row gap-3 w-full items-center'>
                                <label htmlFor="tahun" className='flex w-50 font-semibold whitespace-nowrap'>Tahun</label>
                                <label>:</label>
                                <TextFields 
                                    name="tahun"
                                    placeholder="Masukan Tahun"
                                    value={selectedTgl?.getFullYear().toString()||""}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setSelectedTgl(val ? new Date(val):null)
                                    }}
                                    disabled={true}
                                    icon={<FaRegCalendarAlt size={16} />}
                                    iconPosition='left'
                                    className='flex flex-1 w-80 flex-row gap-3 rounded-xl border items-center
                                        border-gray-300 bg-white px-2 py-1 transition
                                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'
                                />
                            </div>
                            <div className='flex flex-row gap-3 w-full items-center'>
                                <label htmlFor="tahun" className='flex w-50 font-semibold whitespace-nowrap'>Tipe Pembelian</label>
                                <label>:</label>
                                <UIMblDropdown
                                    //label='Tipe Pembelian'
                                    options={Pembelian}
                                    textField="Text"
                                    valueField="Value"
                                    value={selectedPembelian}
                                    onChange={(val, item) => {
                                        console.log("tipe nya : ", val)
                                        console.log("item nya: ", item)
                                        setSelectedPembelian(val)
                                    }}
                                    placeholder="Tipe" 
                                    className='flex flex-1 w-80 flex-row gap-3 rounded-xl border items-center
                                        border-gray-300 bg-white px-2 py-1 transition
                                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'                    
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col items-start gap-5 pb-5'>
                        <label className='flex w-[50%] text-button-primary border-b-2 items-start justify-start text-xl font-semibold'>
                            Produk Reksadana
                        </label>
                        <div className='flex flex-col gap-8 p-2 px-2 w-full'>
                            <div className='flex flex-row gap-3 w-full items-center'>
                                <label htmlFor='tgl' className='flex w-50 font-semibold whitespace-nowrap'>Produk Reksadana</label>
                                <label>:</label>
                                <UIMblDropdown
                                    options={ddlProdukRD}
                                    textField="Text"
                                    valueField="Value"
                                    value={selectedRDProduk}
                                    onChange={(val) => {
                                        setSelectedRDProduk(val)
                                    }}
                                    placeholder="Produk" 
                                    className={`flex flex-row gap-3 w-80 rounded-xl border items-center
                                        border-gray-300 bg-white px-2 py-1 transition
                                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]`}                    
                                />
                            </div>
                            <div className='flex flex-row gap-3 w-full items-center'>
                                <label htmlFor='tgl' className='flex w-50 font-semibold whitespace-nowrap'>Pilihan Portfolio</label>
                                <label>:</label>
                                <UIMblDropdown
                                    options={ddlportfolio}
                                    textField="Text"
                                    valueField="Value"
                                    value={selectedPortfolio}
                                    onChange={async (val) => {
                                        setSelectedPortfolio(val)
                                        const namaport = await getNamaPortf(val)
                                        setSelectedNamaPortfolio(namaport?.nama_portfolio)
                                    }}
                                    placeholder="Produk" 
                                    className={`flex flex-row gap-3 w-80 rounded-xl border items-center
                                        border-gray-300 bg-white px-2 py-1 transition
                                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]`}                    
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <div className='flex flex-row gap-3 w-full items-center'>
                                    <label htmlFor="tahun" className='flex w-50 font-semibold whitespace-nowrap'>Pilih Portfolio</label>
                                    <label>:</label>
                                    <TextFields
                                        name="namaportfolio"
                                        placeholder="Masukkan nama Portfolio"
                                        value={String(selectedNamaPortfolio) ?? ""}
                                        disabled={true}
                                        onChange={(e) => setSelectedNamaPortfolio(e.target.value)}
                                        icon={<FaUser size={16} />} // optional icon
                                        className='flex flex-1 w-80 flex-row gap-3 rounded-xl border items-center
                                            border-gray-300 bg-white px-2 py-1 transition
                                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'                    
                                    />
                                </div>
                                {selectedNamaPortfolio === "" ? (
                                    <div className='
                                        flex flex-1 w-full py-1 
                                        text-sm font-light justify-start 
                                        items-start text-red-700 gap-1'>
                                        <p>Jika Portfolio lu belum ada, berarti buat dulu ya. </p>
                                        <span 
                                            onClick={() => {router.push(`/portofolio/add`)}}
                                            className={`underline underline-offset-4 italic cursor-pointer`}
                                            >Create</span>
                                    </div>
                                ):(<></>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RDAddDesktop
