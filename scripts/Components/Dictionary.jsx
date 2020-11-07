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

    function toogleParagraph() {
        if (message === '') {
            return null
        }
        return (
            <>
                <p className='definition'><strong>Definition: </strong>{message}</p>
            </>
        )
    }

    return (
        <div className='dictionary'>
            <SearchBar />
            <div>
                {toogleParagraph()}
            </div>
        </div>
    )
}

export default Dictionary