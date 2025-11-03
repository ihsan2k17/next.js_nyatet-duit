"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

type DatePickerFieldProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
  formatDate?: (date: Date | null) => string; // ✨ custom format function
};

export default function DatePickerField({
  label,
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  formatDate, // <— ambil dari props
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [popupPosition, setPopupPosition] = useState<"top" | "bottom">("bottom");
  const [align, setAlign] = useState<"left" | "right">("left");
  const containerRef = useRef<HTMLDivElement>(null);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // 🔁 Auto positioning (ASP.NET style)
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;

      setPopupPosition(spaceBelow < 300 && spaceAbove > spaceBelow ? "top" : "bottom");
      setAlign(spaceRight < 300 && spaceLeft > spaceRight ? "right" : "left");
    }
  }, [isOpen]);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) =>
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const handleSelectDate = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // ✨ Default formatter (kalau user gak kasih)
  const defaultFormatDate = (date: Date | null) =>
    date
      ? date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      {/* Input with Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative gap-1 w-full px-3 py-2 border rounded-md cursor-pointer bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition flex items-center justify-between"
      >
        {/* 📆 Icon from react-icons */}
        <FaRegCalendarAlt
            size={18}
            className={`text-indigo-400 transition duration-150 ${
            isOpen ? "text-blue-400 rotate-6" : "hover:text-blue-400"
            }`}
        />
        <span className="truncate text-sm">
          {value
            ? formatDate
              ? formatDate(value)
              : defaultFormatDate(value)
            : <span className="text-indigo-400">{placeholder}</span>}
        </span>

      </div>

      {/* Popup */}
      {isOpen && (
        <div
          className={`absolute z-50 bg-white border rounded-md shadow-lg p-3 w-64
            ${popupPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
            ${align === "right" ? "right-0" : "left-0"}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={prevMonth} className="px-2 py-1 hover:bg-gray-100 rounded">‹</button>
            <span className="font-medium">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button onClick={nextMonth} className="px-2 py-1 hover:bg-gray-100 rounded">›</button>
          </div>

          {/* Days */}
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
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleSelectDate(date)}
                  className={`py-1 rounded-md text-sm transition ${
                    isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-100"
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
}
