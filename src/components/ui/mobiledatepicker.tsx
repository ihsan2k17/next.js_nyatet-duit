'use client'

import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

interface dpPros {
    label?: string;
    value: Date | null;
    onChange: (date: Date) => void;
    placeholder?: string;
    className?: string;
    formatDate?: (date: Date | null) => string;
    width?: string
    icon? : React.ReactNode
    iconPosition?: "right"|"left"
}

const MobileDatePicker = ({
    label,
    value,
    onChange,
    placeholder = "Select date",
    className = "",
    width,
    icon, iconPosition,
    formatDate}: dpPros) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [popupPosition, setPopupPosition] = useState<"top" | "bottom">("bottom");
    const [align, setAlign] = useState<"left" | "right">("left");
    const containerRef = useRef<HTMLDivElement>(null);
    const [openMonth, setOpenMonth] = React.useState(false);
    const [openYear, setOpenYear] = React.useState(false);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // 🔁 Auto positioning
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".datepicker-container")) {
                setIsOpen(false)
                setOpenMonth(false)
                setOpenYear(false)  
            };
        };
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const spaceRight = window.innerWidth - rect.right;
            const spaceLeft = rect.left;
            document.addEventListener("mousedown", handleClickOutside);
            setPopupPosition(spaceBelow < 300 && spaceAbove > spaceBelow ? "top" : "bottom");
            setAlign(spaceRight < 300 && spaceLeft > spaceRight ? "right" : "left");
            if (value) {
                setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
            } else {
                const today = new Date();
                setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
            }
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();

    const daysInMonth= Array.from({ length: endOfMonth.getDate() }, (_, i) => {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
        d.setHours(12, 0, 0, 0); // ✅ set jam ke tengah hari
        return d;
    });


    const handleSelectDate = (date: Date) => {
        const safedate = new Date(date)
        safedate.setHours(12,0,0,0);
        onChange(safedate);
        setIsOpen(false);
    };

    const prevMonth = () =>
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () =>
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

    // Dropdown bulan & tahun
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 10;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);

    const defaultFormatDate = (date: Date | null) =>
        date
        ? date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            })
        : "";

    return (
        <div 
            ref={containerRef} 
            className={`relative ${width || "w-full"} datepicker-container 
                flex flex-col gap-2 items-start justify-center`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}

            {/* Input Field */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    ${className}
                    ${icon ? (iconPosition === "left" ? "pl-2" : "pr-2") : "px-3"}`}
            >
                {/* flex items-center justify-between w-full border rounded-xl px-3 py-2
                    text-sm font-medium shadow-sm hover:border-button-primary
                    transition-all duration-200 focus:ring-2 focus:ring-button-secondary cursor-pointer */}
                {/* <FaCalendarAlt
                size={16}
                className={`text-gray-800 transition duration-150 ${
                    isOpen ? "text-blue-400 rotate-6" : "hover:text-blue-400"
                }`}
                /> */}
                {icon && iconPosition === "left" && (
                    <div className={`${icon ? "flex flex-1":"flex"}items-center pointer-events-none text-gray-500`}>
                        {icon}
                    </div>
                )}
                <span 
                    className={`leading-none relative truncate text-center -top-[2px] py-1
                    ${value ? "font-normal":"font-normal text-gray-500"}`}>
                    {value ? 
                        formatDate ? 
                        formatDate(value) : defaultFormatDate(value)
                        : <span>{placeholder}</span>}
                </span>
                {icon && iconPosition === "right" && (
                    <div className={`${icon ? "flex flex-1":"flex"}items-center pointer-events-none text-gray-500`}>
                        {icon}
                    </div>
                )}
            </button>
            {/* Popup */}
            {isOpen && (
                <div
                className={`
                    absolute z-50 bg-white border border-black/10 rounded-xl shadow-lg p-3 w-64
                    transition-all duration-200 
                    ease-out origin-top
                    ${isOpen ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
                    ${popupPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
                    ${align === "right" ? "right-0" : "left-0"}`}
                >
                {/* Header with dropdowns */}
                <div className="flex items-center justify-between mb-2 gap-2">
                    <button onClick={prevMonth} className="hover:bg-gray-100 rounded">‹</button>
                    {/* Month (custom dropdown) */}
                    <div className="relative w-1/2">
                        <button
                        onClick={() => {
                            setOpenMonth((prev) => !prev)
                            if(openYear) {
                            setOpenYear(!openYear)
                            }
                        }}
                        className={`
                            w-full 
                            border 
                            border-gray-300 
                            rounded-lg 
                            px-3 py-[9px] 
                            text-sm 
                            gap-1
                            bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50`}
                        >
                        {months[currentMonth.getMonth()]}
                        <IoMdArrowDropdown className="text-gray-600" />
                        </button>

                        {openMonth && (
                        <div
                            className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                        >
                            {months.map((m, i) => (
                            <div
                                key={m}
                                onClick={() => {
                                setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                                setOpenMonth(false);
                                }}
                                className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 ${
                                currentMonth.getMonth() === i ? "bg-indigo-500 text-white" : "text-gray-700"
                                }`}
                            >
                                {m}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    {/* Years */}
                    <div className={`relative f-1/2`}>
                        <button
                        onClick={() => {
                            setOpenYear((prev) => !prev)
                            if(openMonth) {
                            setOpenMonth(!openMonth)
                            }
                        }}
                        className={`
                            w-full 
                            border 
                            border-gray-300 
                            gap-1
                            rounded-lg 
                            px-3 py-[9px] text-sm bg-white 
                            flex justify-between items-center cursor-pointer hover:bg-gray-50`}   
                        >
                        {currentMonth.getFullYear()}
                        <IoMdArrowDropdown className="text-gray-600" />
                        </button>
                        {openYear && (
                        <div
                            className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                        >
                            {years.map((y) => (
                            <div
                                key={y}
                                onClick={() => {
                                setCurrentMonth(new Date(y, currentMonth.getMonth(), 1));
                                setOpenYear(false);
                                }}
                                className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                                currentMonth.getFullYear() === y ? "bg-indigo-500 text-white" : ""
                                }`}
                            >
                                {y}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    <button onClick={nextMonth} className="hover:bg-gray-100 rounded">›</button>
                </div>

                {/* Days header */}
                <div className="grid grid-cols-7 text-center text-xs font-semibold mb-1">
                    {days.map((d) => <div key={d}>{d}</div>)}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-7 text-center gap-1">
                    {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                    ))}
                    {daysInMonth.map((date) => {
                    const isSelected = value && date.toDateString() === value.toDateString();
                    const today = new Date();
                    const isToday = 
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear()

                    return (
                        <button
                        key={date.toISOString()}
                        onClick={() => handleSelectDate(date)}
                        className={`py-1 rounded-md text-sm transition ${
                            isSelected ? "bg-indigo-500 text-white" : !value && isToday ? "bg-indigo-500 text-white" : "hover:bg-blue-100"
                        }`}
                        >
                        {date.getDate()}
                        </button>
                    );
                    })}
                </div>
            </div>
        )}
        </div>
    );
};

export default MobileDatePicker;
