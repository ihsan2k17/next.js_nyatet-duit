import { ChartData } from '@/models/ichartsportfoliord';
import React, { useEffect, useState } from 'react'
import CardBalanced from './cardbalance';
import useIsSmallWidth from '@/hooks/issmallwidth';
import { fetchDatacharts } from '@/hooks/services/fetchcharts';
import { CardData } from '@/models/icards';
import { fetchDatacard } from '@/hooks/services/fetchcardbalance';
import CardMonthBalance from './cardmonthbalance';
import CardYearBalance from './cardyearbalance';

const ChildCardReksadana = () => {
  const [card, setCard] = useState<CardData[]>([])
  const [sumPerPortfolio, setSumPerPortfolio] = useState<number>(0);
  const [sumBulanPerPortfolio, setBulanSumPerPortfolio] = useState<number>(0);
  const [sumTahunPerPortfolio, setSumTahunPerPortfolio] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const [alert, setalert] = useState("")
  const smallwidth = useIsSmallWidth()
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
        console.log("resp data:", resp.data);
        console.log("param month:", month, "param year:", year);
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

  if(!smallwidth) {
    return (
      <div className={`flex flex-row gap-3 items-center justify-center w-full`}>
          <CardBalanced 
              sumPerPortfolio={sumPerPortfolio} 
              smallwidth={smallwidth} 
              loading={loading}
              card={card} alert={alert}/>
          <CardMonthBalance 
            sumMonthPerPortfolio={sumBulanPerPortfolio} 
            smallwidth={smallwidth} 
            loading={loading}
            card={card} alert={alert}
          />
          <CardYearBalance 
            sumYearPerPortfolio={sumTahunPerPortfolio} 
            smallwidth={smallwidth} 
            loading={loading} card={card} alert={alert} />
      </div>
    )
  } else {
    return (
      <div className={`flex flex-col gap-3 items-center justify-center w-full`}>
        <div className={`flex flex-row gap-3 items-center w-full`}>
          <CardMonthBalance 
            sumMonthPerPortfolio={sumBulanPerPortfolio} 
            smallwidth={smallwidth} 
            loading={loading}
            card={card} alert={alert}
          />
          <CardYearBalance 
            sumYearPerPortfolio={sumTahunPerPortfolio} 
            smallwidth={smallwidth} 
            loading={loading} card={card} alert={alert} />
        </div>
        <div className={`flex w-full`}>
          <CardBalanced 
              sumPerPortfolio={sumPerPortfolio} 
              smallwidth={smallwidth} 
              loading={loading}
              card={card} alert={alert}/>
        </div>
      </div>
    )
  }
}

export default ChildCardReksadana
