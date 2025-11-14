import React from 'react'

interface TextFieldProps {
  label?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
  icon? : React.ReactNode
  iconPosition?: "right"|"left"
}

const TextFields = ({
    label, name, type, placeholder, value, 
    onChange, disabled, required, error, className, 
    icon, iconPosition}: TextFieldProps) => {
    return (
        <div className={`flex flex-col gap-2 items-start justify-center w-full`}>
        {label && (
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div    
            className={`
                ${className}
                ${icon ? (iconPosition === "left" ? "pl-2" : "pr-2") : "px-3"}
                ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                ${error ? "border-red-500" : ""}
                `}>
            {icon && iconPosition === "left" && (
                <div className={`${icon ? "flex flex-1":"flex"}items-center pointer-events-none text-gray-500`}>
                    {icon}
                </div>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className='border-none outline-none w-full'
            />
            {icon && iconPosition === "right" && (
                <div className={`${icon ? "flex flex-1":"flex"}items-center pointer-events-none text-gray-500`}>
                    {icon}
                </div>
            )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default TextFields
