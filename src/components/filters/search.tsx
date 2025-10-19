import { Table } from '@tanstack/react-table'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface searchprops<TData> {
  placeholder?: string
  value?: string|number|readonly string[]| undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export function Search<TData> ({placeholder, value, onChange}:searchprops<TData>) {
    return (
        <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-2.5 text-button-secondary" size={18} />
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-white border rounded-lg pl-9 pr-3 py-2 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
    )
}

