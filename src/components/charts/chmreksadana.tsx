'use client'
import { fetchDatacharts, transformData } from '@/hooks/services/fetchcharts'
import { ChartData, TransformedData } from '@/models/ichartsportfoliord'
import React, { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import MSumPortfolio from '../cards/reksadana/mobile/cardsumportfolio'

const ChartMobileReksadana = () => {
    const [data, setData] = useState<TransformedData[]>([])
    const [loading, setLoading] = useState(true)
    const [portfolios, setPortfolios] = useState<string[]>([])
    const [alert, setAlert] = useState<string>('')
    const [range, setRange] = useState<string>('ALL')
    const [sumPerPortfolio, setSumPerPortfolio] = useState<Record<string, number>>({});
    const [countProduct, setCountProduct] = useState<Record<string,number>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp: { data: ChartData[] } = await fetchDatacharts(setAlert, setLoading)
                if (resp?.data) {
                const transformed = transformData(resp.data)
                setData(transformed)

                // ambil nama portfolio unik
                const uniq = Array.from(new Set(resp.data.map((item) => item.portfolio)))
                    setPortfolios(uniq)
                }
                if (resp && Array.isArray(resp.data)) {
                    const sum = resp.data.reduce((acc: Record<string, number>, item: ChartData) => {
                        acc[item.portfolio] = (acc[item.portfolio] || 0) + item.nominal_uang;
                        return acc;
                    }, {});
                    setSumPerPortfolio(sum)
                    
                    // count nama_sekuritas unik per portfolio
                    const map: Record<string, Set<string>> = {};
                    resp.data.forEach(item => {
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
                console.error('Gagal fetch chart data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    const colorPalette = ["#1a2a80", "#3b38a0", "#b2b0e8", "#7a85c1"]
    // **Auto-height**: 220px minimal, nambah 40px per portfolio
    const chartHeight = Math.max(220, portfolios.length * 40)
    // **Auto-margin**: biar XAxis & Legend gak ketutup
    const chartMargin = { top: 10, right: 0, left: -20, bottom: 0 + portfolios.length * 5 }
    // ambil data berdasarkan range time
    const getFilteredData = () => {
        if(!data.length) return []
        const now = new Date()
        let startDate: Date
        switch (range) {
            case '1D': startDate = new Date(); startDate.setDate(now.getDate() - 1); break
            case '1W': startDate = new Date(); startDate.setDate(now.getDate() - 7); break
            case '1M': startDate = new Date(); startDate.setMonth(now.getMonth() - 1); break
            case '3M': startDate = new Date(); startDate.setMonth(now.getMonth() - 3); break
            case '1Y': startDate = new Date(); startDate.setFullYear(now.getFullYear() - 1); break
            case '3Y': startDate = new Date(); startDate.setFullYear(now.getFullYear() - 3); break
            case '5Y': startDate = new Date(); startDate.setFullYear(now.getFullYear() - 5); break
            default: 
        return data
  }

    const startTimestamp = startDate.getTime()
        return data.filter((item) => {
            const itemDate = new Date(item.tanggal)
            const itemTimestamp = itemDate.getTime()
            return itemTimestamp >= startTimestamp
        })
  
    }

    return (
        <div className={`flex w-full gap-5 p-1.5 pb-3 bg-white rounded-3xl shadow-[0_6px_24px_rgba(0,0,0,0.05)] border border-slate-100`}>
        {loading ? (
            <p className="text-center text-gray-500 text-sm">Loading chart...</p>
        ) : (
        <div className="relative w-full flex flex-col gap-2 ">
            {alert && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md z-10">
                {alert}
                </div>
            )}
            <div className={`w-full relative min-h-[220px]`}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <AreaChart 
                        data={getFilteredData()} 
                        margin={chartMargin} 
                        >
                        <defs>
                            {portfolios.map((pf, i) => (
                            <linearGradient id={`grad-${i}`} key={pf} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colorPalette[i % colorPalette.length]} stopOpacity="0.35" />
                                <stop offset="100%" stopColor={colorPalette[i % colorPalette.length]} stopOpacity="0" />
                            </linearGradient>
                            ))}
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
                        <XAxis 
                            dataKey="bulan" 
                            tick={{ fontSize: 11, fill: '#475569' }} 
                            axisLine={false} 
                            tickLine={false}/>
                        <YAxis
                            tick={{ fontSize: 11, fill: '#475569' }}
                            tickFormatter={(v) =>
                            new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(v)
                            }
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }}
                            contentStyle={{
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                            fontSize: '12px',
                            }}
                            formatter={(val: number) => val.toLocaleString('id-ID')}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '1px' }} />
                        {portfolios.map((pf, i) => (
                            <Area
                            key={pf}
                            type="monotone"
                            dataKey={pf}
                            stroke={colorPalette[i % colorPalette.length]}
                            strokeWidth={2.2}
                            fill={`url(#grad-${i})`}
                            isAnimationActive
                            animationDuration={800}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {/* 🔵 Tombol Range */}
            <div className="top-1 left-2 z-10 flex flex-wrap gap-1.5 w-full justify-center">
                {['ALL', '5Y', '3Y', '1Y', '3M', '1M','1W','1D'].map((r) => (
                <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`text-[10px] px-2 py-1 rounded-full border font-medium transition-all ${
                    range === r
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                >
                    {r}
                </button>
                ))}
            </div>
            {/* Total per portfolio */}
            <MSumPortfolio sumPerPortfolio={sumPerPortfolio} countProduct={countProduct}/>
        </div>
        )}
        </div>
    )
}

export default ChartMobileReksadana
