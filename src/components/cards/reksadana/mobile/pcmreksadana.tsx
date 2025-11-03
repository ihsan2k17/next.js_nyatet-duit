import React, { useEffect, useState } from 'react'
import ChildCardMobileReksadana from './ccmreksadana'
import ChartMobileReksadana from '@/components/charts/chmreksadana'
import { ChartData, TransformedData } from '@/models/ichartsportfoliord'
import { fetchDatacharts, transformData } from '@/hooks/services/fetchcharts'
import { fetchDatacard } from '@/hooks/services/fetchcardbalance'
import { CardData } from '@/models/icards'
import CardMobileNoData from '../../cmnodata'

interface pcrdProps {
    activeTab: string
}

const ParentCardMobileReksadana = ({activeTab}: pcrdProps) => {
    const [data, setData] = useState<TransformedData[]>([])
    const [card, setCard] = useState<CardData[]>([])
    const [loading, setLoading] = useState(true)
    const [portfolios, setPortfolios] = useState<string[]>([])
    const [alert, setAlert] = useState<string>('')
    const [sumNamePerPortfolio, setSumNamePerPortfolio] = useState<Record<string, number>>({});
    const [sumMobilePerPortfolio, setSumMobilePerPortfolio] = useState<number>(0)
    const [sumBulanPerPortfolio, setBulanSumPerPortfolio] = useState<number>(0);
    const [sumTahunPerPortfolio, setSumTahunPerPortfolio] = useState<number>(0);
    const [countProduct, setCountProduct] = useState<Record<string,number>>({});
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const [cardResp, chartResp] = await Promise.all([
                    fetchDatacard(setAlert, setLoading),
                    fetchDatacharts(setAlert, setLoading)
                ])

                if (chartResp?.data && Array.isArray(chartResp.data)) {
                    const datachart = chartResp.data
                    const transformed = transformData(datachart)
                    setData(transformed)

                    // ambil nama portfolio unik
                    const uniq = Array.from(new Set<string>(datachart.map((i: ChartData) => i.portfolio)))
                        setPortfolios(uniq)

                    // total portfolio number nih
                    const totalPortfolio = datachart.reduce((acc: number, item: ChartData) => acc + item.nominal_uang, 0)
                    setSumMobilePerPortfolio(totalPortfolio)

                    // total buat card yg ada di chart per portfolio harus Record<string,number>
                    const totalnameprotfolio = datachart.reduce(
                        (acc: Record<string,number>, item: ChartData) => {
                            acc[item.portfolio] = (acc[item.portfolio]|| 0) + item.nominal_uang
                            return acc
                        },{})
                    setSumNamePerPortfolio(totalnameprotfolio)

                    // count produk masing masing 
                    const map: Record<string, Set<string>> = {};
                    datachart.forEach((item: ChartData) => {
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
                    const filterbulan = datachart.filter((v:ChartData) => v.bulan === month && v.tahun === year)
                    const total1 = filterbulan.reduce((acc:number, item: ChartData) => acc + item.nominal_uang, 0)
                    const filteryear = datachart.filter((v:ChartData) => v.tahun === year)
                    const total2 = filteryear.reduce((acc: number, item: ChartData) => acc + item.nominal_uang, 0)
                    setBulanSumPerPortfolio(total1)
                    setSumTahunPerPortfolio(total2)
                }
                if(cardResp?.data) {
                    setCard(cardResp.data)
                }
                setLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    setAlert("Gak dapet brok data nya, lu gada masukin bulan ini kayanya :( \nDetail: " + error.message);
                    console.error(error.message);
                } else {
                    setAlert("Gak dapet brok data nya, tapi error gak jelas tipenya.");
                    console.error(error);
                }
            } finally {
                setLoading(false)
            }
        }
        loadData()
    },[])
    if(data.length === 0 && card.length === 0){ 
        return (
            <div className={`flex flex-col gap-4`}>
                <CardMobileNoData 
                    label={'Lu Belum Punya Portfolio, Sebaik nya Bikin dulu'} 
                    buttonlabel={'Create New Portfolio'} 
                    redirectTo='/portofolio/reksadana/add'/>
                <CardMobileNoData 
                    label={'Lu Belum nambahin Rekening nih'} 
                    buttonlabel={'Create New Rekening'} />
            </div>
        )
    } else if (data.length === 0) {
        return (
            <CardMobileNoData 
                label='Lu Belum Punya Portfolio, Sebaik nya Bikin dulu'
                buttonlabel='Create New Portfolio'
                redirectTo='/portofolio/reksadana/add'/>
        )
    } else if(card.length === 0) {
        return (
            <CardMobileNoData 
            label='Lu belum nambahin Rekening nih' 
            buttonlabel='Create New Portfolio'/>
        )
    } else {
        return (
            <div className={`
                flex flex-col gap-3 
                transition-transform duration-500
                ${activeTab === 'reksadana' ? 'translate-x-0':'-translate-x-full'}`}>
                <ChartMobileReksadana 
                    data={data} 
                    loading={loading} 
                    portfolios={portfolios} 
                    sumNamePerPortfolio={sumNamePerPortfolio} 
                    countProduct={countProduct} />
                <div>
                    <ChildCardMobileReksadana 
                        card={card} 
                        sumPerPortfolio={sumMobilePerPortfolio} 
                        sumBulanPerPortfolio={sumBulanPerPortfolio} 
                        sumTahunPerPortfolio={sumTahunPerPortfolio} 
                        loading={loading} 
                        alert={alert} />
                </div>
            </div>
        )
    }
}

export default ParentCardMobileReksadana
