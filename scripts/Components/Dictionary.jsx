import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import Socket from './Socket'

function Dictionary () {

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

export default Dictionary