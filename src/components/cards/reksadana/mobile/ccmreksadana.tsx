import React, {  } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { CardData } from '@/models/icards';
import CardMobileBalance from './cardmbalance';
import CardMobileMonthBalance from './cardmmonthbalance';
import CardMobileYearBalance from './cardmyearbalance';


interface ChildCmreksadana {
  card: CardData[]
  sumPerPortfolio: number
  sumBulanPerPortfolio: number
  sumTahunPerPortfolio: number
  loading:boolean
  alert: string
}

const ChildCardMobileReksadana = ({
    card, 
    sumPerPortfolio, 
    sumBulanPerPortfolio, 
    sumTahunPerPortfolio, loading, alert}: ChildCmreksadana) => {
  
  

  return (
    <div className="flex items-center justify-center h-full pt-5 bg-white rounded-4xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        className="w-full"
        loop={true}
        speed={8000}
        autoplay={{
        delay: 0, 
        disableOnInteraction: false, // biar tetap auto walau di-swipe manual
      }}
      >
        <SwiperSlide className={`px-5`}>
          <CardMobileBalance
            sumPerPortfolio={sumPerPortfolio}
            loading={loading}
            card={card}
            alert={alert}
          />
        </SwiperSlide>
        <SwiperSlide className={`px-5`}>
          <CardMobileMonthBalance
            sumMonthPerPortfolio={sumBulanPerPortfolio}
            loading={loading}
            card={card}
            alert={alert}
          />
        </SwiperSlide>
        <SwiperSlide className={`px-5`}>
          <CardMobileYearBalance 
            sumYearPerPortfolio={sumTahunPerPortfolio} 
            loading={loading} 
            card={card} 
            alert={alert} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ChildCardMobileReksadana
