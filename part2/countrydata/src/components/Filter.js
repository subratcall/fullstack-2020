import React from 'react'

const Filter = ({ filterChange }) => {
    return (<>
        Filter By: <input onChange={filterChange} /> <br />
    </>)
}

export default Filter