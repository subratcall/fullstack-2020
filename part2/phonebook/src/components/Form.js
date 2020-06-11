import React from 'react'

const Input = ({ onChange, value, text }) =>
    <>{text} <input onChange={onChange} value={value} /> <br /></>

const Form = ({ nameChange, numChange, handleClick, nameValue, numValue }) => {
    return (<form>
        <Input onChange={nameChange} value={nameValue} text={'Name: '} />
        <Input onChange={numChange} value={numValue} text={'Number: '} />
        <button type="submit" onClick={handleClick}>Add</button>
    </form>
    )
}

export default Form