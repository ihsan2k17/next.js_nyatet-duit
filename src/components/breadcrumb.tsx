'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const Breadcrumbs = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)
    return (
        <nav className="flex flex-wrap items-center text-sm font-bold text-button-primary">
            {segments.map((segment, idx) => {
                const href = '/' + segments.slice(0, idx + 1).join('/')
                const isLast = idx === segments.length - 1

                return (
                <div key={href} className="flex items-center">
                    {!isLast ? (
                    <>
                        <Link
                        href={href}
                        className="hover:underline capitalize"
                        >
                        {segment}
                        </Link>
                        <FaArrowRight className="mx-2 text-button-primary text-xs" />
                    </>
                    ) : (
                    <span className="capitalize text-gray-500">{segment}</span>
                    )}
                </div>
                )
            })}
        </nav>
    )
}

export default Breadcrumbs
