import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const hook = () => {
    contactService.getAll()
      .then(currentContacts => {
        setPersons(currentContacts)
        setFiltered(currentContacts)
      })
  }
  useEffect(hook, [])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [notif, setNotif] = useState(null)
  const [error, setError] = useState(false)

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numChange = (event) => {
    setNewNum(event.target.value)
  }

  const filterChange = (event) => {
    setFiltered(persons.filter(
      person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }

  const addContact = (event) => {
    event.preventDefault()
    const existing = persons.find(person => person.name === newName)
    if (existing != null) {
      if (window.confirm(
        `${newName} is already in the phonebook, replace their old number with the new one?`
      )) {
        contactService.update(
          existing.id, { id: existing.id, name: existing.name, number: newNum }
        )
          .then(updatedContact => {
            setPersons(persons.map(person => person.id != existing.id ? person : updatedContact))
            setFiltered(persons.map(person => person.id != existing.id ? person : updatedContact))
            setNotif(`Number of ${updatedContact.name} successfully changed`)
            setError(false)
            setTimeout(() => setNotif(null), 5000)
          }).catch(() => {
            setNotif(`${existing.name} has already been deleted from the server`)
            setError(true)
            setTimeout(() => setNotif(null), 5000)
          })
      }
    } else {
      contactService.create({ id: newName, name: newName, number: newNum })
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setFiltered(persons.concat(newContact))
          setNewName('')
          setNewNum('')
          setNotif(`Added ${newContact.name}`)
          setError(false)
          setTimeout(() => setNotif(null), 5000)
        })
    }
  }

  const deleteContact = (event) => {
    const id = event.target.id
    const contact = persons.find(person => person.id == id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.remove(id)
        .then(
          () => {
            const newContacts = persons.filter(person => person.id != id)
            setPersons(newContacts)
            setFiltered(newContacts)
            setNotif(`${contact.name} successfully deleted`)
            setError(false)
            setTimeout(() => setNotif(null), 5000)
          }
        ).catch(
          () => {
            setNotif(`${contact.name} has already been deleted from the server`)
            setError(true)
            setTimeout(() => setNotif(null), 5000)
          })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notif} error={error} />
      <Filter
        filterChange={filterChange}
      />

      <h2>New Contact</h2>
      <Form
        nameChange={nameChange} numChange={numChange} handleClick={addContact}
        nameValue={newName} numValue={newNum}
      />

      <h2>Contacts</h2>
      <Contacts persons={filtered} handleClick={deleteContact} />
    </>
  )
}

export default App