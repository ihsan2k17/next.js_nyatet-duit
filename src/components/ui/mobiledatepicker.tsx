'use client'

import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { createPortal } from "react-dom";

interface dpPros {
    label?: string;
    value: Date | null;
    onChange: (date: Date) => void;
    placeholder?: string;
    className?: string;
    formatDate?: (date: Date | null) => string;
    width?: string;
    icon?: React.ReactNode;
    iconPosition?: "right" | "left";
}

const MobileDatePicker = ({
    label,
    value,
    onChange,
    placeholder = "Select date",
    className = "",
    width,
    icon, iconPosition,
    formatDate
}: dpPros) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [popupStyle, setPopupStyle] = useState<any>({});
    const [openMonth, setOpenMonth] = useState(false);
    const [openYear, setOpenYear] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // PORTAL TARGET
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!isOpen || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        setPopupStyle({
            position: "absolute",
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
            zIndex: 99999,
        });

        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                popupRef.current &&
                !popupRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
                setOpenMonth(false);
                setOpenYear(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const startOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    );
    const endOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    );

    const startDay = startOfMonth.getDay();
    const daysInMonth = Array.from(
        { length: endOfMonth.getDate() },
        (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
    );

    const defaultFormatDate = (date: Date | null) =>
        date
            ? date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
              })
            : "";

    const calendarPopup = (
        <div
            ref={popupRef}
            style={popupStyle}
            className="
                bg-white border border-black/10 rounded-xl shadow-lg p-3 w-64
                transition-all duration-200
            "
        >
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-2 gap-2">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                    ‹
                </button>

                <div className="relative w-1/2">
                    <button
                        onClick={() => setOpenMonth(!openMonth)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white flex justify-between"
                    >
                        {currentMonth.toLocaleString("default", { month: "short" })}
                        <IoMdArrowDropdown />
                    </button>
                    {openMonth && (
                        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                                        setOpenMonth(false);
                                    }}
                                >
                                    {new Date(0, i).toLocaleString("default", {
                                        month: "short",
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative w-1/2">
                    <button
                        onClick={() => setOpenYear(!openYear)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white flex justify-between"
                    >
                        {currentMonth.getFullYear()}
                        <IoMdArrowDropdown />
                    </button>
                    {openYear && (
                        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {Array.from({ length: 120 }).map((_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <div
                                        key={year}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
                                            setOpenYear(false);
                                        }}
                                    >
                                        {year}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                    ›
                </button>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold mb-1">
                {days.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 text-center gap-1">
                {Array.from({ length: startDay }).map((_, i) => (
                    <div key={i}></div>
                ))}
                {daysInMonth.map((date) => {
                    const isSelected =
                        value && date.toDateString() === value.toDateString();

                    return (
                        <button
                            key={date.toISOString()}
                            className={`py-1 rounded-md text-sm ${
                                isSelected
                                    ? "bg-indigo-500 text-white"
                                    : "hover:bg-blue-100"
                            }`}
                            onClick={() => {
                                onChange(date);
                                setIsOpen(false);
                            }}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={`relative ${width || "w-full"} datepicker-container flex flex-col gap-2`}
        >
            {label && <label>{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={className}
            >
                {value
                    ? formatDate
                        ? formatDate(value)
                        : defaultFormatDate(value)
                    : placeholder}
            </button>

            {mounted && isOpen && createPortal(calendarPopup, document.body)}
        </div>
    );
};

export default MobileDatePicker;
