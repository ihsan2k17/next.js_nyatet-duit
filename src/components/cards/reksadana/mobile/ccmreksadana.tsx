import React, { useEffect, useState } from 'react'
import CardBalanced from '../cardbalance'
import { CardData } from '@/models/icards';
import { fetchDatacard } from '@/hooks/services/fetchcardbalance';
import { ChartData } from '@/models/ichartsportfoliord';
import { fetchDatacharts } from '@/hooks/services/fetchcharts';
import CardMobileBalance from './cardmbalance';



const ChildCardMobileReksadana = () => {
  const [card, setCard] = useState<CardData[]>([])
  const [sumPerPortfolio, setSumPerPortfolio] = useState<number>(0);
  const [sumBulanPerPortfolio, setBulanSumPerPortfolio] = useState<number>(0);
  const [sumTahunPerPortfolio, setSumTahunPerPortfolio] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const [alert, setalert] = useState("")
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()
  useEffect(() =>{
    const loadData = async () => {
      const data = await fetchDatacard(setalert, setLoading)
      if (data?.data) {
        setCard(data.data)
      }
    }
    loadData()
  },[])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const resp: {data:ChartData[] } = await fetchDatacharts(setalert, setLoading);
        const total = resp.data.reduce((acc, item) => acc + item.nominal_uang, 0);
        const filterbulan = resp.data.filter(v => v.bulan === month && v.tahun === year)
        const total1 = filterbulan.reduce((acc, item) => acc + item.nominal_uang, 0)
        const filteryear = resp.data.filter(v => v.tahun === year)
        const total2 = filteryear.reduce((acc, item) => acc + item.nominal_uang, 0)
        setSumPerPortfolio(total); // 4000000
        setBulanSumPerPortfolio(total1);
        setSumTahunPerPortfolio(total2);
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
    fetchdata()
  },[])  

  return (
    <div className="flex items-center justify-center h-full pt-10">
      <div className="flex-col">
        <CardMobileBalance sumPerPortfolio={sumPerPortfolio} loading={loading} card={card} alert={alert} />
      </div>
    </div>
  )
}

export default ChildCardMobileReksadana
