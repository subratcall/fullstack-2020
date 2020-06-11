import React from 'react'

const Notification = ({ message, error }) => {
    const style = {
        borderRadius: '5px',
        padding: '10px',
        background: 'lightgrey',
        marginBottom: '1rem'
    }
    if (error) {
        style.border = 'solid 2px red'
        style.color = 'red'
    } else {
        style.border = 'solid 2px green'
        style.color = 'green'
    }

    if (message === null) {
        return null
    } else {
        return (
            <div style={style}>
                {message}
            </div>
        )
    }
}

export default Notification