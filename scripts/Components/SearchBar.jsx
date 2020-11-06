import React, { useState } from 'react'
import Socket from './Socket'

function SearchBar () {

    const [text, setText] = useState('')

    function handleChange (e) {
        setText(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        Socket.emit('send message', text)
        setText('')
    }

    return (
        <div>
             <form onSubmit={handleSubmit}>
                <input type={text} className="input-area" onChange={handleChange}
                    value={text} placeholder="Enter text.." required />
                <button type='submit'> Submit </button>
             </form>
        </div>
    )
}

export default SearchBar