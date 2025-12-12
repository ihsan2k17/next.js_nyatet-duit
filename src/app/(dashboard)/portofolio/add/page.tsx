import Loading40 from '@/components/animations/loading40'
import React, { Suspense } from 'react'
import RDAddPortfolioClient from './rdaddclient'
export const metadata = {
  title: "Portfolio",
  openGraph: {
    title: "Portfolio | Add",
    description: "Tambah Data Portfolio",
    type:"website",
  },
}
const AddPortfolio = () => {
    return (
        <Suspense fallback={<Loading40/>}>
            <RDAddPortfolioClient/>
        </Suspense>
    )
}

export default AddPortfolio
