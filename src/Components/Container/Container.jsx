import React from 'react'

function Container({ children, size }) {
    return <div className={`w-full max-w-7xl max-w-${size}xl mx-auto px-4`}>{children}</div>

}

export default Container