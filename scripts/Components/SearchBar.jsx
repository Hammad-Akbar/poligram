import React from 'react'

function SearchBar ( { setText, text } ) {

    function handleChange (e) {
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