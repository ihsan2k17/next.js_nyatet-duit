"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface DropdownProps<T> {
  label?: string;
  options: T[];
  value?: string | number;
  placeholder?: string;
  onChange: (value: string | number, item: T) => void;
  width?: string;
  /** nama properti untuk text display */
  textField: keyof T;
  /** nama properti untuk value */
  valueField: keyof T;
}

const Dropdown = <T,>({
  label,
  options,
  value,
  placeholder,
  onChange,
  width,
  textField,
  valueField,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (opt) => opt[valueField]?.toString() === value?.toString()
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${width || "w-full"}`} ref={dropdownRef}>
        {label && (
            <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
            </label>
        )}
            {/* BUTTON */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-between w-full border rounded-xl px-3 py-2
                        text-sm font-medium shadow-sm hover:border-button-primary
                        transition-all duration-200 focus:ring-2 focus:ring-button-secondary cursor-pointer"
            >
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <FiChevronDown size={18} className="text-gray-600" />
                </motion.div>
                <span className="leading-none relative p-2 truncate text-center -top-[2px]">
                    {selectedOption ? (
                        String(selectedOption[textField])
                    ) : (
                        <span className="text-button-primary">{placeholder}</span>
                    )}  
                </span>
            </button>

            {/* DROPDOWN LIST */}
            <AnimatePresence>
                {open && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl z-50
                            overflow-hidden backdrop-blur-sm cursor-pointer"
                >
                    <div className="max-h-56 overflow-auto scrollbar-thin scrollbar-thumb-gray-200">
                    {options.map((opt, i) => (
                        <div
                        key={i}
                        onClick={() => {
                            onChange(opt[valueField] as string | number, opt);
                            setOpen(false);
                        }}
                        className={`px-3 py-2 text-sm text-start transition-colors duration-150 
                            ${
                            opt[valueField]?.toString() === value?.toString()
                                ? "bg-indigo-100 text-indigo-600 font-semibold"
                                : "hover:bg-indigo-50 text-gray-700"
                            }`}
                        >
                        {String(opt[textField])}
                        </div>
                    ))}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
