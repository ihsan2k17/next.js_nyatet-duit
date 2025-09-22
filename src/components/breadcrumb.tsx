'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const Breadcrumbs = () => {
    const pathname = usePathname()
    const segment = pathname.split('/').filter(Boolean)
    return (
        <nav className={`flex flex-row items-center justify-between text-sm font-bold    text-button-primary space-x-1`}>
            {segment.map((segments, idx) => {
                const href = '/' + segment.slice(0, idx + 1).join('/')
                const isLast = idx === segment.length - 1

                return (
                    <div key={href} className={`flex items-center`}>
                        {isLast ? (
                            <Link href={href} className={`hover:underline capitalize`}>
                                {segments}
                            </Link>
                        ): ( <span className={`font-semibold capitalize`}>{segments}</span>)}
                        {isLast && <span className={`mx-1 text-button-primary`}><FaArrowRight /></span>}
                    </div>
                )
            })}
        </nav>  
    )
}

export default Breadcrumbs
