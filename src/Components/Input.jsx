import React from 'react'
import { useId } from 'react'

function Input({
    label,
    type = 'text',
    className = '',
    errorMessage = '',
    labelColor = '',
    required = '',
    ...props
}, ref) {
    const id = useId();



    return (
        <div className={`w-full ${labelColor}`}>
            {label && <label
                htmlFor={id}>
                {label}
            </label>}
            {required && <span
            className='text-red-600 text-xl'>*</span>}

            <input id={id}
                className={`text-black px-3 py-2 rounded-lg bg-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props} />
            <div>
                <span className='mt-2 text-red-600'>
                    {errorMessage}
                </span>
            </div>
        </div>

    )
}

export default React.forwardRef(Input)