import React, { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar'
import Socket from './Components/Socket'

function Content () {

    const [message, setMessage] = useState('')

    useEffect(() => {
        Socket.on('forward message', (data) => {
            setMessage(data)
        })
        return () => {
            window.removeEventListener("beforeunload", () => {
                Socket.close()
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