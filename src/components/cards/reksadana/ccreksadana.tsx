import { ChartData } from '@/models/ichartsportfoliord';
import React, { useEffect, useState } from 'react'
import CardBalanced from './cardbalance';
import useIsSmallWidth from '@/hooks/issmallwidth';
import { irekening } from '@/models/irekening';

const ChildCardReksadana = () => {
  const [rekAccount, setRekAccount] = useState<irekening[]>([])
  const [sumPerPortfolio, setSumPerPortfolio] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const smallwidth = useIsSmallWidth()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/portfolio/charts");
        const json: { data: ChartData[] } = await res.json();
        const total = json.data.reduce((acc, item) => acc + item.nominal_uang, 0);
        setSumPerPortfolio(total); // 4000000

      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false)
      }
    } 
    fetchdata()
  },[])

  const LoadingText = ({ text }: { text: string }) => {
    return (
      <div className="flex gap-0.5">
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              animation: `bounce 1s infinite`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {char}
          </span>
        ))}
        <style jsx>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </div>
    );
  };

  if(!smallwidth) {
    return (
      <div className={`flex flex-row gap-3 items-center justify-center w-full`}>
          {loading ? 
            <div className="flex flex-col gap-2 w-[70%]">
              <LoadingText text={`Loading Your Balance ...`}/>
            </div> :
            <CardBalanced 
              sumPerPortfolio={sumPerPortfolio} 
              portfolioName={'Balanced Your Card'} 
              smallwidth={smallwidth}/>
          }
          <div className={`flex w-[35%] bg-primary/45 p-10 rounded-2xl`}>Card masukan bulan ini</div>
          <div className={`flex w-[35%] bg-primary/45 p-10 rounded-2xl`}>Card masukan tahun ini</div>
      </div>
    )
  } else {
    return (
      <div className={`flex flex-col gap-3 items-center justify-center w-full`}>
        <div className={`flex flex-row gap-3 items-center w-full`}>
          <div className={`flex w-[50%] bg-primary/45 p-10 rounded-2xl`}>Card masukan bulan ini</div>
          <div className={`flex w-[50%] bg-primary/45 p-10 rounded-2xl`}>Card masukan tahun ini</div>
        </div>
        <div className={`flex w-full`}>
          {loading ? 
            <div className="flex flex-col gap-2 w-[70%]">
              <LoadingText text={`Loading Your Balance ...`}/>
            </div> :
            <CardBalanced 
              sumPerPortfolio={sumPerPortfolio} 
              portfolioName={'Balanced Your Card'} 
              smallwidth={smallwidth}/>
          }
        </div>
      </div>
    )
  }
  
}

export default ChildCardReksadana
