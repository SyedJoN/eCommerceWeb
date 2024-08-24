import React from 'react'

function Button({
    form,
    type,
    children,
    className = "",
    textColor = "text-white",
    bgColor = 'bg-blue-500',
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
        type={type}
        form={form}
            {...props}>
            {children}
        </button>
    )
}

export default Button