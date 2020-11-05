import React, { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar'
import socket from './Components/Socket'

function Content () {

    const [text, setText] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        socket.on('forward message', (data) => {
            setMessage(data)
        })
    }, [])

    function handleSubmit (e) {
        e.preventDefault()
        socket.emit('send message', text)
        setText('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SearchBar setText={setText} text={text} />
                <button type='submit'> Submit </button>
            </form>
            <h3>{message}</h3>
        </div>
    )
}

export default Content