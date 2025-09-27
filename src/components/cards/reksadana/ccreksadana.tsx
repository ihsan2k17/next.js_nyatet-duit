import { ChartData } from '@/models/ichartsportfoliord';
import React, { useEffect, useState } from 'react'
import CardBalanced from './cardbalance';
import useIsSmallWidth from '@/hooks/issmallwidth';
import { fetchDatacharts } from '@/hooks/services/fetchcharts';
import { CardData } from '@/models/icards';
import { fetchDatacard } from '@/hooks/services/fetchcardbalance';
import CardMonthBalance from './cardmonthbalance';

const ChildCardReksadana = () => {
  const [card, setCard] = useState<CardData[]>([])
  const [sumPerPortfolio, setSumPerPortfolio] = useState<number>(0);
  const [sumBulanPerPortfolio, setBulanSumPerPortfolio] = useState<number>(0);
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
        const res = await fetch("/api/portfolio/charts");
        const json: { data: ChartData[] } = await res.json();
        const total = json.data.reduce((acc, item) => acc + item.nominal_uang, 0);
        setSumPerPortfolio(total); // 4000000

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

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const res = await fetchDatacharts(setalert,setLoading)
        const filteran: ChartData[] = res.data.filter((v: ChartData) => v.bulan === month && v.tahun === year)
        const total = filteran.reduce((acc, item) => acc + item.nominal_uang, 0);
        setBulanSumPerPortfolio(total);
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
          <div className={`flex w-[35%] bg-primary/45 p-10 rounded-2xl`}>Card masukan tahun ini</div>
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
          <div className={`flex w-[50%] bg-primary/45 p-10 rounded-2xl`}>Card masukan tahun ini</div>
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
