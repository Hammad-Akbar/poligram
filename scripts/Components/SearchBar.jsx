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
        <div className='form'>
             <form onSubmit={handleSubmit}>
                <input className='search-bar' type={text} onChange={handleChange}
                    value={text} placeholder="Enter a political term.." required />
                <button className='button' type='submit'> Search </button>
             </form>
        </div>
    )
}

export default SearchBar