import { Suspense } from 'react'
import React from 'react'
import Loading40 from '@/components/animations/loading40'
import ReksadanaClient from './rdclient'

export const dynamic = "force-dynamic"
export const metadata = {
  title: "Reksadana",
  openGraph: {
    title: "Reksadana | Dashboard",
    description: "Data Dari Reksadana",
    type:"website",
  },
}


const Reksadana = () => {
    return (
      <Suspense fallback={<Loading40/>}>
          <ReksadanaClient/>
      </Suspense>
    )
}

export default Reksadana
