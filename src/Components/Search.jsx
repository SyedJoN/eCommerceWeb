import React, { useState } from 'react';


function Search({ onChangeVal, className = '' }) {
    const clearVal = () => {
        setInputVal('');
        onChangeVal('');
    }
    const [inputVal, setInputVal] = useState('');

    const handleInputVal = e => {
        setInputVal(e.target.value);
        onChangeVal(e.target.value.toLowerCase());
    }
    return (
        <div className={`${className} relative flex justify-center mt-2 w-50 mr-20 lg:w-96 max-h-7`}>

            <input
                className='border border-black px-3 py-2 rounded-2xl w-full '
                type="text"
                onChange={handleInputVal}
                value={inputVal}
            />
            <button
                className='absolute right-3'
                onClick={clearVal}
                // hidden={!inputVal}
            >
                {inputVal === '' ? (

                    <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }} role="img" aria-label="search">&#x1F50E;&#xFE0E;</span>
                    ) : (
                        
                        'X'

                )}
            </button>
        </div>
    );
}

export default Search;