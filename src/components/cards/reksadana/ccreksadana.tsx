import { ChartData } from '@/models/ichartsportfoliord';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CardBalanced from './cardbalance';
import useIsSmallWidth from '@/hooks/issmallwidth';
import { CardData } from '@/models/icards';
import CardMonthBalance from './cardmonthbalance';
import CardYearBalance from './cardyearbalance';

interface ccprops {
  card: CardData[]
  sumPerPortfolio: number
  sumBulanPerPortfolio: number
  sumTahunPerPortfolio: number
  loading:boolean
  alert: string
}

const ChildCardReksadana = ({
  card, sumPerPortfolio, sumBulanPerPortfolio, 
  sumTahunPerPortfolio, loading, alert, 
}:ccprops) => {

  const smallwidth = useIsSmallWidth()
  

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
        <div className={`flex w-full px-20`}>
          <div className={`flex w-full px-24`}>
            <CardBalanced 
              sumPerPortfolio={sumPerPortfolio} 
              smallwidth={smallwidth} 
              loading={loading}
              card={card} alert={alert}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ChildCardReksadana
