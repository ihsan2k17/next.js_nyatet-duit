'use client'
import DatePickerField from '@/components/filters/datepicker'
import MobileDatePicker from '@/components/ui/mobiledatepicker'
import TextFields from '@/components/ui/textfields'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaCalendarAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import imgadd from "../../../../../../public/paperplane_add.png"; 
import Image from 'next/image'

const RDAddMobile = () => {
    const router = useRouter() 
    const [stringPortfolio, setStringPortfolio] = useState("")
    const [selectedTgl, setSelectedTgl] = useState<Date | null>(null)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    return (
        <div className='flex flex-1 flex-col gap-1 p-2 items-center justify-center bg-white'>
            {/* <div className='p-2 rounded-full bg-indigo-50 transition
                    shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]'> */}
            {/* <div>
                <Image 
                    src={imgadd} 
                    alt="Tambah Reksadana" 
                    className="w-40 h-40 object-contain pointer-events-none"
                />
            </div>             */}
            <div className='flex flex-1 p-2 flex-col gap-3 rounded-t-xl w-full'>
                <div className='flex flex-1 w-full items-center justify-start'>
                    <label 
                        className='text-2xl font-semibold text-button-primary text-start'
                        htmlFor="title">Add Transaksi Reksadana</label>
                </div>
                <TextFields
                    label="Portfolio"
                    name="portfolio"
                    placeholder="Masukkan Portfolio"
                    value={stringPortfolio}
                    onChange={(e) => setStringPortfolio(e.target.value)}
                    icon={<FaUser size={16} />} // optional icon
                    iconPosition="left" // bisa left atau right
                    className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                        border-gray-300 bg-white px-2 py-1 transition
                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                        items-center'
                />
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
                    value={selectedTgl?.getFullYear().toString()}
                    onChange={(e) => {
                        const val = e.target.value
                        setSelectedTgl(val ? new Date(val):null)
                    }}
                    icon={<FaRegCalendarAlt size={16} />}
                    iconPosition='left'
                    className='flex flex-1 flex-row gap-3 rounded-xl border w-full
                        border-gray-300 bg-white px-2 py-1 transition
                        shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                        items-center'
                />
            </div>
        </div>
    )
}

export default RDAddMobile
