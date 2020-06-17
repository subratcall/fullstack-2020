import React from 'react'

const Contact = ({ person, handleClick }) =>
    <>
        {person.name} {person.number}
        <button id={person.id} onClick={handleClick}>Delete</button> <br />
    </>

const Contacts = ({ persons, handleClick }) => {
    return (
        <>
            {persons.map(
                person =>
                    <Contact person={person} key={person.id} handleClick={handleClick} />
            )}
        </>
    )
}

export default Contacts