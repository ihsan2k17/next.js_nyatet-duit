'use client'
import MobileDatePicker from '@/components/ui/mobiledatepicker'
import TextFields from '@/components/ui/textfields'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBill, FaMoneyBill1, FaRegCreditCard, FaUser } from 'react-icons/fa6'
import UIMblDropdown from '@/components/ui/uimbldropdown'
import { fetchDDLreksadana } from '@/hooks/services/fetchddlreksadana'
import Loading40 from '@/components/animations/loading40'
import { InsertDataRD } from '@/hooks/services/insertdatard'
import { IDFormatted } from '@/hooks/isformatted'
import SuccessMobile from '@/components/modals/mobile/success'
import ErrorMobile from '@/components/modals/mobile/error'

const RDAddMobile = () => {
    const router = useRouter() 
    const [ddlportfolio, setDDLportfolio] = useState([])
    const [selectedPortfolio, setSelectedPortfolio] = useState<number|string>("")
    const [selectedNamaPortfolio, setSelectedNamaPortfolio] = useState<string|number>("")
    const [selectedduit, setSelectedDuit] = useState<string>("")
    const [selectedNAV, setSelectedNAV] = useState<number|string>("")
    const [selectedJU, setSelectedJU] = useState<number|string>("")
    const [selectedTgl, setSelectedTgl] = useState<Date | null>(null)
    const [selectedPembelian, setSelectedPembelian] = useState<string|number>()
    const [loading, setLoading] = useState(false)
    const [ddlRekRDN, setDDLRekRDN] = useState([])
    const [selectedRekRDN, setSelectedRekRDN] = useState<string|number>()
    const [selectedNoRekRDN, setSelectedNoRekRDN] = useState<string|number>("")
    const [ddlProdukRD, setDDLProdukRD] = useState([])
    const [selectedRDProduk, setSelectedRDProduk] = useState<string|number>()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState<"error" | "success" | null>(null)

    const Pembelian = [
        { Value: "Pembelian", Text: "Pembelian" },
        { Value: "Penjualan", Text: "Penjualan" },
        { Value: "Dividen", Text: "Dividen" }
    ];
    useEffect(() => {
        const loadddl = async () => {
            // const jenis = await fetchDDLreksadana(setLoading, setError, "CEKRDJENISTRANS")
            // setDDLJenisTrans(jenis)

            const rek = await fetchDDLreksadana(setLoading, setError, "CEKMASTERREKRDN")
            setDDLRekRDN(rek)

            const prod = await fetchDDLreksadana(setLoading, setError, "CEKPRODUKRD")
            setDDLProdukRD(prod)

            const idport = await fetchDDLreksadana(setLoading, setError, "CEKRDPORTFOLIO")
            setDDLportfolio(idport)
        }
        loadddl()

        if(error !== "") {
            setModalOpen(true)
            setModalType("error")
        }
        if(success !== "") {
            setModalOpen(true)
            setModalType("success")
        }
    },[error, success])
    const getNorek = async (val: string | number) => {
        const data = await fetchDDLreksadana(
            setLoading, 
            setError, 
            "SELECTEDNOREKRDN", 
            Number(val),
            null
        )
        return data
    }
    const getNamaPortf = async (val: string|number) => {
        const data = await fetchDDLreksadana(
            setLoading,setError,"SELECTEDNAMAPORTFOLIO",null, Number(val)
        )
        return data
    }

    if(loading) return <Loading40 />
    return (
        <div className='flex flex-1 flex-col gap-1 items-center justify-center bg-white'>
            <div className='flex flex-1 p-2 flex-col gap-3 rounded-t-xl w-full'>
                <div className='flex flex-1 w-full items-center justify-start'>
                    <label 
                        className='text-2xl font-semibold text-button-primary text-start'
                        htmlFor="title">Add Transaksi Reksadana</label>
                </div>
                {/* panel informasi transaksi */}
                <div className='flex flex-1 flex-col p-2 border rounded-xl items-center gap-3 pb-5'>
                    <label className='flex w-full text-button-primary items-start justify-start text-xl font-semibold'>
                        Informasi Transaksi
                    </label>
                    <MobileDatePicker
                        label='Tanggal Transaksi'
                        placeholder='Pilih Tanggal'
                        value={selectedTgl}
                        onChange={setSelectedTgl}
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                        icon={<FaCalendarAlt size={16}/>}
                        iconPosition='left'
                        formatDate={(date) =>
                            date ? date.toISOString().split("T")[0] : "" // 👉 yyyy-mm-dd
                        } 
                    />
                    <TextFields 
                        label="Tahun"
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
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                    <UIMblDropdown
                        label='Tipe Pembelian'
                        options={Pembelian}
                        textField="Text"
                        valueField="Value"
                        value={selectedPembelian}
                        onChange={(val) => {
                            //console.log("tipe nya : ", val)
                            setSelectedPembelian(val)
                        }}
                        placeholder="Tipe" 
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'                    
                    />
                </div>
                {/* panell produk rd */}
                <div className='flex flex-1 flex-col p-2 border rounded-xl items-center justify-center gap-3 pb-5'>
                    <label className='flex w-full text-button-primary items-start justify-start text-xl font-semibold'>
                        Produk Reksadana
                    </label>
                    <UIMblDropdown
                        label='Reksadana Produk'
                        options={ddlProdukRD}
                        textField="Text"
                        valueField="Value"
                        value={selectedRDProduk}
                        onChange={(val) => {
                            setSelectedRDProduk(val)
                        }}
                        placeholder="Produk" 
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'                    
                    />
                    <UIMblDropdown
                        label='Pilihan Portfolio'
                        options={ddlportfolio}
                        textField="Text"
                        valueField="Value"
                        value={selectedPortfolio}
                        onChange={async (val) => {
                            setSelectedPortfolio(val)
                            //console.log("id portfolio nya: ", val)
                            //const norek =await fetchDDLreksadana(setLoading,setError, "SELECTEDNOREKRDN", Number(val))
                            const namaport =await getNamaPortf(val)
                            setSelectedNamaPortfolio(namaport?.nama_portfolio)
                        }}
                        placeholder="Pilih Portfolio" 
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'                    
                    />
                    <TextFields
                        label="Nama Portfolio"
                        name="namaportfolio"
                        placeholder="Masukkan nama Portfolio"
                        value={String(selectedNamaPortfolio) ?? ""}
                        disabled={true}
                        onChange={(e) => setSelectedNamaPortfolio(e.target.value)}
                        icon={<FaUser size={16} />} // optional icon
                        iconPosition="left" // bisa left atau right
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                    {selectedNamaPortfolio === "" ? (
                        <div className='
                            flex flex-1 px-2 w-full py-1 
                            text-sm font-light justify-start 
                            items-start text-red-700 gap-1'>
                            <p>Jika Portfolio lu belum ada, berarti buat dulu ya. </p>
                            <span 
                                onClick={() => {router.push(`/portofolio/add`)}}
                                className={`underline underline-offset-4 italic`}
                                >Create</span>
                        </div>
                    ):(<></>)}
                </div>
                {/* panelll rdn */}
                <div className='flex flex-1 flex-col p-2 border rounded-xl items-center justify-center gap-3 pb-5'>
                    <label className='flex w-full text-button-primary items-start justify-start text-xl font-semibold'>
                        Rekening Dana Nasabah
                    </label>
                    <UIMblDropdown
                        label='Rekening Dana Nasabah'
                        options={ddlRekRDN}
                        textField="Text"
                        valueField="Value"
                        value={selectedRekRDN}
                        onChange={async (val) => {
                            setSelectedRekRDN(val)
                            //console.log("data rdn: ", selectedRekRDN)
                            //const norek =await fetchDDLreksadana(setLoading,setError, "SELECTEDNOREKRDN", Number(val))
                            const norek =await getNorek(val)
                            setSelectedNoRekRDN(norek?.No_Rekening)
                        }}
                        placeholder="Produk" 
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'                    
                    />
                    <TextFields 
                        label="No Rekening"
                        name="Rekening"
                        placeholder="Masukan No Rekening Dana Nasabah"
                        value={String(selectedNoRekRDN) ?? ""}
                        disabled={true}
                        onChange={(e) => {
                            const val = e.target.value
                            setSelectedNoRekRDN(val)
                        }}
                        icon={<FaRegCreditCard size={16} />}
                        iconPosition='left'
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                </div> 
                {/*  panel nilai transaksi */}
                <div className='flex flex-1 flex-col p-2 border rounded-xl items-center justify-center gap-3 pb-5'>
                    <label className='flex w-full text-button-primary items-start justify-start text-xl font-semibold'>
                        Nilai Transaksi
                    </label>
                    <TextFields
                        label="Nominal Uang"
                        name="nominaluang"
                        placeholder="Masukkan Nominal Uang"
                        value={IDFormatted(String(selectedduit))}
                        onChange={(e) => {
                            const ori = e.target.value.replace(/\D/g,"")
                            setSelectedDuit(ori)
                        }}
                        icon={<FaRegMoneyBillAlt  size={16} />} // optional icon
                        iconPosition="left" // bisa left atau right
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                    <TextFields
                        label="Nilai NAV"
                        name="nav"
                        placeholder="Masukkan Nilai NAV"
                        value={String(selectedNAV)}
                        onChange={(e) => {
                            const ori = e.target.value
                            setSelectedNAV(ori)
                        }}
                        icon={<FaMoneyBill size={16} />} // optional icon
                        iconPosition="left" // bisa left atau right
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                    <TextFields
                        label="Jumlah Unit"
                        name="jumlahunit"
                        placeholder="Masukkan Jumlah Unit"
                        value={String(selectedJU)}
                        onChange={(e) => {
                            const ori = e.target.value
                            setSelectedJU(ori)
                        }}
                        icon={<FaMoneyBill1 size={16} />} // optional icon
                        iconPosition="left" // bisa left atau right
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-white px-2 py-1 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center'
                    />
                </div>     
                {/* Tombol Saveee */}          
                <div 
                    className='flex flex-1 w-full pt-5'>
                    <button 
                        className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                            border-gray-300 bg-button-primary px-2 py-2 transition
                            shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                            items-center justify-center text-white'
                        onClick={() => {
                            InsertDataRD(
                                setLoading, 
                                setError, 
                                setSuccess,
                                Number(selectedRekRDN),
                                Number(selectedRDProduk),
                                selectedTgl,
                                Number(selectedTgl?.getFullYear().toString()),
                                Number(selectedNoRekRDN),
                                String(selectedNamaPortfolio),
                                String(selectedduit).replace(/,/g,""),
                                String(selectedNAV).replace(/,/g,""),
                                String(selectedJU).replace(/,/g,""),
                                String(selectedPembelian),
                                Number(selectedPortfolio)
                            )
                        }}
                        >
                            Save
                    </button>
                </div>
            </div>
            {/* modalll */}
            <div className=''>
                {modalType === "error" && (
                    <ErrorMobile
                        show={modalOpen}
                        onConfirm={() => {
                            setModalOpen(false);
                            setError("");     // reset biar ga muncul lagi
                        }}
                        title="Gagal!"
                        Message={error}
                        confirmTitleButton="Tutup"
                    />
                )}
                {modalType === "success" && (
                    <SuccessMobile
                        show={modalOpen}
                        onConfirm={() => {
                            setModalOpen(false);
                            setSuccess("");   // reset
                        }}
                        title="Berhasil!"
                        Message={success}
                        confirmTitleButton="Oke!"
                    />
                )}
            </div>
        </div>
    )
}

export default RDAddMobile
