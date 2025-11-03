'use client'
import React, { useEffect, useState } from 'react'
import ChildCardReksadana from './ccreksadana'
import ChartsReksadana, { cusbarProps } from '@/components/charts/chreksadana'
import { fetchDatacard } from '@/hooks/services/fetchcardbalance'
import { ChartData, TransformedData } from '@/models/ichartsportfoliord'
import { fetchDatacharts, transformData } from '@/hooks/services/fetchcharts'
import { CardData } from '@/models/icards'
import CardDesktopNoData from '../cdnodata'

interface pcrdProps {
    activeTab: string
}
const ParentCardReksadana = ({activeTab}: pcrdProps) => {
    const [childData, setChildData] = useState<CardData[]>([])
    // State buat nyimpen data chart
    const [chartData, setChartData] = useState<TransformedData[]>([]);
    const [sumPerPortfolio, setSumPerPortfolio] = useState<number>(0);
    // List portfolio unik (buat legend & warna bar)
    const [portfolios, setPortfolios] = useState<string[]>([]);
    // Total akumulasi per portfolio
    const [sumNamePortfolio, setSumNamePortfolio] = useState<Record<string, number>>({});
    const [countProduct, setCountProduct] = useState<Record<string,number>>({});
    const [sumBulanPerPortfolio, setBulanSumPerPortfolio] = useState<number>(0);
    const [sumTahunPerPortfolio, setSumTahunPerPortfolio] = useState<number>(0);
    const [loading, setLoading] = useState(true)
    const [alert, setalert] = useState("")
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    
    useEffect(() => {
        const loadData = async () => {
            try {
                const [datachart, datacard] = await Promise.all([
                    fetchDatacharts(setalert, setLoading),
                    fetchDatacard(setalert,setLoading)
                ])
                if(datachart?.data && Array.isArray(datachart.data)) {
                    const chart = datachart.data
                    const transformed = transformData(chart)
                    setChartData(transformed)

                    // ambil nama portfolio unik
                    const uniq = Array.from(new Set<string>(chart.map((i: ChartData) => i.portfolio)))
                    setPortfolios(uniq)

                    // total portfolio number nih
                    const totalPortfolio = chart.reduce((acc: number, item: ChartData) => acc + item.nominal_uang, 0)
                    setSumPerPortfolio(totalPortfolio)

                    // total buat card yg ada di chart per portfolio harus Record<string,number>
                    const totalnameprotfolio = chart.reduce(
                        (acc: Record<string,number>, item: ChartData) => {
                            acc[item.portfolio] = (acc[item.portfolio]|| 0) + item.nominal_uang
                            return acc
                        },{})
                    setSumNamePortfolio(totalnameprotfolio)

                    // count produk masing masing 
                    const map: Record<string, Set<string>> = {};
                    chart.forEach((item: ChartData) => {
                        if (!map[item.portfolio]) map[item.portfolio] = new Set();
                        map[item.portfolio].add(item.nama_sekuritas);
                    });
                    const countProduct: Record<string, number> = {};
                    Object.keys(map).forEach(portfolio => {
                        countProduct[portfolio] = map[portfolio].size;
                    });
                    //console.log("%c📊 Jumlah produk unik per portfolio:", "color:cyan;font-weight:bold;", countProduct);
                    setCountProduct(countProduct);

                    // nyari per bulan dan per tahun brokkk
                    const filterbulan = chart.filter((v:ChartData) => v.bulan === month && v.tahun === year)
                    const total1 = filterbulan.reduce((acc:number, item: ChartData) => acc + item.nominal_uang, 0)
                    const filteryear = chart.filter((v:ChartData) => v.tahun === year)
                    const total2 = filteryear.reduce((acc: number, item: ChartData) => acc + item.nominal_uang, 0)
                    setBulanSumPerPortfolio(total1)
                    setSumTahunPerPortfolio(total2)
                }
                if(datacard?.data) {
                    setChildData(datacard.data)
                }
                setLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    setalert("Gak dapet brok data nya, lu gada masukin bulan ini kayanya :( \nDetail: " + error.message);
                    console.error(error.message);
                } else {
                    setalert("Gak dapet brok data nya, tapi error gak jelas tipenya.");
                    console.error(error);
                }
            } finally {
                setLoading(false)
            }
        }
        loadData()
    },[])
    //console.log("childDataDesktop:", childData, "chartDataDesktop:", chartData);
    if (childData.length === 0 && chartData.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <CardDesktopNoData
                    label="Lu Belum nambahin Rekening nih"
                    buttonlabel="Create New Rekening"
                />
                <CardDesktopNoData
                    label="Data Reksadana lu kosong, Sebaiknya Bikin dulu"
                    buttonlabel="Create New Portfolio"
                    redirectTo="/portofolio/reksadana/add"
                />
            </div>
        );
    } else if (childData.length === 0) {
        return (
            <CardDesktopNoData
            label="Lu Belum nambahin Rekening nih"
            buttonlabel="Create New Rekening"
            />
        );
    } else if ((chartData?.length ?? 0) === 0) {
        return (
            <CardDesktopNoData
            label="Data Reksadana lu kosong, Sebaiknya Bikin dulu"
            buttonlabel="Create New Portfolio"
            redirectTo="/portofolio/reksadana/add"
            />
        );
    } else {
        return (
            <div className={`
                relative flex flex-col items-center gap-6 rounded-lg 
                shadow transition-transform duration-500
            ${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}`}>
                <ChildCardReksadana 
                    card={childData} 
                    sumPerPortfolio={sumPerPortfolio}
                    sumBulanPerPortfolio={sumBulanPerPortfolio}  
                    sumTahunPerPortfolio={sumTahunPerPortfolio} 
                    loading={loading}
                    alert={alert} />
                <div className={`flex w-full`}>
                    <ChartsReksadana 
                        data={chartData}
                        loading={loading}
                        portfolios={portfolios}
                        countProduct={countProduct}
                        sumPerPortfolio={sumNamePortfolio} />
                </div>
            </div>
        )
    }
}

export default ParentCardReksadana
