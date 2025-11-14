import React from 'react'
import PortfolioClient from './portfolioclient'

export const metadata = {
  title: "Portfolio",
  openGraph: {
    title: "Portfolio | Dashboard",
    description: "Halaman Portfolio",
    type:"website",
  },
}

const Portfolio = () => {
    return <PortfolioClient />
}

export default Portfolio
