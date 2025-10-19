import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi';

interface dropdownprops {
    options: (string | number)[];
    value?: string | number;
    placeholder?: string;
    onChange: (value: string | number) => void;
    width?: string;
}

const Dropdown = ({
    options,
    value,
    placeholder,
    onChange,
    width
}: dropdownprops) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }};
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className={`relative ${width}`} ref={dropdownRef}>
            {/* BUTTON */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-between w-full border rounded-xl px-3 py-2
                        text-sm font-medium shadow-sm bg-white hover:border-indigo-400
                        transition-all duration-200 focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
                <span className="truncate">
                    {value ? value : <span className="text-indigo-400">{placeholder}</span>}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <FiChevronDown size={18} className="text-gray-600" />
                </motion.div>
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
                            onChange(opt);
                            setOpen(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 
                            ${
                            opt === value
                                ? "bg-indigo-100 text-indigo-600 font-semibold"
                                : "hover:bg-indigo-50 text-gray-700"
                            }`}
                        >
                        {opt}
                        </div>
                    ))}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
    
}

export default Dropdown
