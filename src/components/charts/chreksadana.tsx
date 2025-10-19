'use client'

import useIsSmallWidth from '@/hooks/issmallwidth';
import { transformData } from '@/hooks/services/fetchcharts';
import { ChartData, TransformedData } from '@/models/ichartsportfoliord';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Brush, CartesianGrid, Legend, RectangleProps, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MSumPortfolio from '../cards/reksadana/mobile/cardsumportfolio';
import DSumPortfolio from '../cards/reksadana/cardsumportfolio';


// Custom props untuk bar chart
interface cusbarProps extends RectangleProps {
  value?: number;
  fill?: string;
}


const ChartsReksadana = () => {
  // State buat nyimpen data chart
  const [data, setData] = useState<TransformedData[]>([]);
  const [loading, setLoading] = useState(true);

  // List portfolio unik (buat legend & warna bar)
  const [portfolios, setPortfolios] = useState<string[]>([]);

  // Total akumulasi per portfolio
  const [sumPerPortfolio, setSumPerPortfolio] = useState<Record<string, number>>({});
  const [countProduct, setCountProduct] = useState<Record<string,number>>({});
  // Hook custom → cek apakah layar kecil atau gede
  const smallwidth = useIsSmallWidth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data dari API
        const res = await fetch("/api/portfolio/charts");
        const json: { data: ChartData[] } = await res.json();

        // Transform biar bisa dimakan Recharts
        const transformed = transformData(json.data || []);
        setData(transformed);

        // Ambil nama portfolio unik (biar tau bar apa aja yg muncul)
        const uniq = Array.from(
          new Set((json.data || []).map((item: ChartData) => item.portfolio as string))
        );
        setPortfolios(uniq);

        // Hitung total nominal per portfolio
        if (json && Array.isArray(json.data)) {
          const sum = json.data.reduce((acc: Record<string, number>, item: ChartData) => {
            acc[item.portfolio] = (acc[item.portfolio] || 0) + item.nominal_uang;
            return acc;
          }, {});
          setSumPerPortfolio(sum);
          const map: Record<string, Set<string>> = {};
            json.data.forEach(item => {
            if (!map[item.portfolio]) map[item.portfolio] = new Set();
            map[item.portfolio].add(item.nama_sekuritas);
            });
            const countProduct: Record<string, number> = {};
            Object.keys(map).forEach(portfolio => {
            countProduct[portfolio] = map[portfolio].size;
            });
            setCountProduct(countProduct);
        }
      } catch (err) {
        console.error("Gagal fetch chart data:", err);
      } finally {
        // Matikan loading state
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Warna buat bar chart (looping sesuai jumlah portfolio)
  const colorPalette = ["#1a2a80", "#3b38a0", "#b2b0e8", "#7a85c1"];
  const portfolioColors: Record<string, string> = {};
  for (let i = 0; i < portfolios.length; i++) {
    portfolioColors[portfolios[i]] = colorPalette[i % colorPalette.length];
  }

  // Custom Bar: kalau value < 0 jadi merah
  const CustomBar: React.FC<cusbarProps> = (props) => {
    const { x, y, width, height, value, fill } = props;
    const color = value !== undefined && value < 0 ? "#e11d48" : fill;
    return <rect x={x} y={y} width={width} height={height} fill={color} />;
  };

  // Komponen animasi loading
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

  // Kalau masih loading → tampilkan teks animasi
  if (loading) return <LoadingText text={'Loading Your Charts, Enjoy Every Moments :)...'} />

  return (
    <div
      className={`flex flex-col rounded-2xl 
        ${smallwidth ? "w-full p-4 bg-primary/30" : "w-full p-10 bg-primary/45"}`
      }
    >
      {/* Total per portfolio */}
      <DSumPortfolio sumPerPortfolio={sumPerPortfolio} countProduct={countProduct}/>
      {/* <div className={`flex flex-wrap gap-3`}>
        {Object.entries(sumPerPortfolio).map(([portfolio, total]) => (
          <div key={portfolio} className="flex justify-between gap-2 text-center items-center">
            <span className="font-medium">{portfolio} : </span>
            <span className={`text-white bg-button-primary rounded px-3 py-2`}>
              {total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        ))}
      </div> */}

      {/* Chart section */}
      <div className={`${smallwidth ? "h-[40rem]" : "h-[35rem]"} w-full`}>
        <ResponsiveContainer>
          <BarChart 
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            {/* Garis grid chart */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>

            {/* Sumbu X → bulan */}
            <XAxis dataKey="bulan" interval={"preserveStartEnd"} />
            <Brush dataKey="bulan" height={30} stroke="#8884d8"/>

            {/* Sumbu Y → angka, diformat jadi compact (1K, 1M, dst) */}
            <YAxis 
              tickFormatter={(
                value => new Intl.NumberFormat("id-ID",{
                  notation:"compact", 
                  maximumFractionDigits:1}).
                format(value)
              )
            }/>

            {/* Tooltip saat hover */}
            <Tooltip 
              formatter={(value: number) =>
                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR",minimumFractionDigits:0, maximumFractionDigits:0 }).format(value)
              }
            />

            {/* Legend (nama portfolio) */}
            <Legend />

            {/* Render bar untuk setiap portfolio */}
            {portfolios.map((portfolio) => (
              <Bar
                key={portfolio}
                dataKey={portfolio}
                fill={portfolioColors[portfolio]}
                shape={<CustomBar />}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartsReksadana
