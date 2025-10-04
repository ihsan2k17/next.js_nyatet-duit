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

const ChartMobileReksadana = () => {
    const [data, setData] = useState<TransformedData[]>([])
    const [loading, setLoading] = useState(true)
    const [portfolios, setPortfolios] = useState<string[]>([])
    const [alert, setAlert] = useState<string>('')

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
        } catch (err) {
            console.error('Gagal fetch chart data:', err)
        } finally {
            setLoading(false)
        }
        }

        fetchData()
    }, [])

    const colorPalette = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed']

    return (
        <div className="w-full h-80 p-3 bg-white rounded-3xl shadow-[0_6px_24px_rgba(0,0,0,0.05)] border border-slate-100">
        {loading ? (
            <p className="text-center text-gray-500 text-sm">Loading chart...</p>
        ) : (
        <div className="relative w-full h-full">
            {alert && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md z-10">
                {alert}
                </div>
            )}

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 15, left: -5, bottom: 35 }}>
                <defs>
                    {portfolios.map((pf, i) => (
                    <linearGradient id={`grad-${i}`} key={pf} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorPalette[i % colorPalette.length]} stopOpacity="0.35" />
                        <stop offset="100%" stopColor={colorPalette[i % colorPalette.length]} stopOpacity="0" />
                    </linearGradient>
                    ))}
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
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
        )}
        </div>
    )
}

export default ChartMobileReksadana
