import React, { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar'
import socket from './Components/Socket'

function Content () {

    const [message, setMessage] = useState('')

    useEffect(() => {
        socket.on('forward message', (data) => {
            setMessage(data)
        })
        return () => {
            window.removeEventListener("beforeunload", () => {
                socket.close();
            })
        }
    }, [])

    return (
        <div>
            <SearchBar />
            <h3>{message}</h3>
        </div>
    )
}

export default Content