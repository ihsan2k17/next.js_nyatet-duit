import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

interface searchprops {
  placeholder?: string
  value?: string|number|readonly string[]| undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  onClick? :(query: string) => void
}

export function Search ({placeholder, value, onChange, onClick}:searchprops) {
  const [internalValue, setInternalValue] = useState(value ?? '')
  // 🔥 sinkronkan internalValue dengan prop value
  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(e)
  }

  const handleClick = () => {
    onClick?.(internalValue.toString().trim())
  }
  return (
    <div
      className={`relative flex w-full sm:w-64 border bg-white transition 
      ${onClick ? 'rounded-lg' : 'rounded-lg'} 
      focus-within:ring-2 focus-within:ring-indigo-800 focus-within:border-indigo-800`}
    >
      <FiSearch
        className="absolute left-3 top-2.5 text-button-secondary pointer-events-none"
        size={18}
      />

      <input
        type="text"
        placeholder={placeholder ?? 'Search...'}
        value={internalValue}
        onChange={handleInputChange}
        className={`w-full pl-9 pr-3 py-2 text-sm bg-transparent rounded-l-lg focus:outline-none`}
      />

      {onClick && (
        <button
          type="button"
          onClick={handleClick}
          className="bg-button-primary text-white px-4 rounded-r-lg flex items-center justify-center hover:opacity-90"
        >
          <FiSearch size={18} />
        </button>
      )}
    </div>
  )
}

