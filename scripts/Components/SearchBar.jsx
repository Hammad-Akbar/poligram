import React from 'react'

const SearchBar = ( { setText, text } ) => {

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <input type={text} className="input-area" onChange={handleChange}
             value={text} placeholder="Enter text.." required />
        </div>
    )
}

export default SearchBar