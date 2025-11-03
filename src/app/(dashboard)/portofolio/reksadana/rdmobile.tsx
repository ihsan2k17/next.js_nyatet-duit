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

const ReksadanaMobile = () => {
    const [data, setData] = useState<IDataTableRD[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string | number>()
    const [selectedSort, setSelectedSort] = useState<string|number>()
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const router = useRouter() 

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const result = await fetchDataReksadana(setError, setLoading)
                setData(result)
                setLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    setError("Gak dapet brok data nya, lu gada masukin bulan ini kayanya :( \nDetail: " + error.message);
                    console.error(error.message);
                } else {
                    setError("Gak dapet brok data nya, tapi error gak jelas tipenya.");
                    console.error(error);
                }
            }
        }
        loadData()
    }, [])

    const countries = [
        { countryName: "Indonesia", countryCode: "ID" },
        { countryName: "Malaysia", countryCode: "MY" },
        { countryName: "Singapore", countryCode: "SG" },
        { countryName: "Thailand", countryCode: "TH" },
    ];

    const sort = [
        {text:'Ascending', value:'asc'},
        {text:'Descending', value:'desc'}
    ]
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
        <div className={`flex flex-col gap-2`}>
            Reksadana Mobile
            <div className={`flex flex-row w-full bg-amber-100`}>
                <div className={`flex flex-1 p-2 bg-amber-300 items-center justify-center`}>
                    <Dropdown
                        options={countries}
                        textField="countryName"
                        valueField="countryCode"
                        value={selectedCountry}
                        onChange={(val, item) => {
                            console.log("Selected:", val);
                            console.log("select Item: ",item)
                            setSelectedCountry(val);
                        }}
                        placeholder="Country"
                    />
                </div>
                <div className={`flex flex-1 p-2 bg-amber-400 items-center justify-center`}>
                    <Dropdown
                        options={sort}
                        textField={"text"}
                        valueField={"value"}
                        value={selectedSort}
                        onChange={(val, item) => {
                            console.log("selected sort: ", val, item)
                            setSelectedSort(val)
                        }}
                        placeholder='Sort'
                    />
                </div>
                <div className={`flex flex-1 bg-amber-600 items-center justify-center p-2`}>
                    <DatePickerField
                        placeholder='Tgl Transaksi'
                        value={selectedDate}
                        onChange={setSelectedDate}
                        formatDate={(date) =>
                            date ? date.toISOString().split("T")[0] : "" // 👉 yyyy-mm-dd
                        }
                    />
                </div>
            </div>
            {selectedDate && (
                <p className="mt-4 text-gray-700">
                    Kamu pilih: {selectedDate.toISOString().split("T")[0]}
                </p>
            )}
        </div>
    )
}

export default ReksadanaMobile
