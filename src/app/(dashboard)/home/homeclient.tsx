'use client'
import useIsMobile from '@/hooks/ismobile'
import React, { useEffect, useState } from 'react'

const HomeClient = () => {
  const isMobile = useIsMobile()
  return isMobile ? <div></div> :   
    <div>
      Ini tuh home brokkkkkk
    </div>
}

export default HomeClient
