import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";

interface DropdownProps<T> {
    label?: string;
    options: T[];
    value?: string | number;
    placeholder?: string;
    onChange: (value: string | number, item: T) => void;
    width?: string;
    textField: keyof T;
    valueField: keyof T;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: "right" | "left";
}

const UIMblDropdown = <T,>({
    label,
    options,
    value,
    placeholder,
    onChange,
    width,
    textField,
    valueField,
    icon,
    iconPosition,
    className,
}: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find(
        (opt) => opt[valueField]?.toString() === value?.toString()
    );

    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
        width: 0,
    });

    // CLICK OUTSIDE (AMAN UNTUK PORTAL)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const dropdownEl = document.getElementById("dropdown-portal");

            if (
                !dropdownEl?.contains(e.target as Node) && 
                !buttonRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Portal root
    const portalRoot = document.getElementById("dropdown-portal");

    return (
        <div className={`relative ${width || "w-full"} flex flex-col gap-2`}>
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {/* BUTTON */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                    const rect = buttonRef.current!.getBoundingClientRect();
                    setCoords({
                        top: rect.bottom + 4,
                        left: rect.left,
                        width: rect.width,
                    });
                    setOpen((p) => !p);
                }}
                className={`
                    ${className}
                    ${icon ? (iconPosition === "left" ? "pl-2" : "pr-2") : "px-3"}
                `}
            >
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <FiChevronDown size={18} className="text-gray-600" />
                </motion.div>

                <span
                    className={`
                        leading-none relative truncate text-ellipsis overflow-hidden
                        block w-full text-left py-1 font-normal
                        ${selectedOption ? "text-black" : "text-gray-500"}
                    `}
                >
                    {selectedOption
                        ? String(selectedOption[textField])
                        : placeholder}
                </span>
            </button>

            {/* PORTAL DROPDOWN */}
            {open &&
                portalRoot &&
                createPortal(
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "fixed",
                                top: coords.top,
                                left: coords.left,
                                width: coords.width,
                            }}
                            className="bg-white border rounded-xl shadow-xl z-[9999] cursor-pointer"
                        >
                            <div className="max-h-56 overflow-auto scrollbar-thin scrollbar-thumb-gray-200">
                                {options.map((opt, i) => (
                                    <div
                                        key={i}
                                        onMouseDown={() => {
                                            onChange(
                                                opt[valueField] as string | number,
                                                opt
                                            );
                                            setOpen(false);
                                        }}
                                        className={`px-3 py-2 text-sm transition-colors
                                            ${
                                                opt[valueField]?.toString() === value?.toString()
                                                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                                                    : "hover:bg-indigo-50 text-gray-700"
                                            }
                                        `}
                                    >
                                        {String(opt[textField])}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>,
                    portalRoot
                )}
        </div>
    );
};

export default UIMblDropdown;
