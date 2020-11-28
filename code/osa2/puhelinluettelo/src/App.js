import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState({message: null, type: null}) 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const displayNotification = (message, type) => {
    setNotificationMessage({message, type})
    setTimeout(() => {
      setNotificationMessage({message: null, type: null})
    }, 5000)
  }

  const filteredPersons = persons.filter(
    p => p.name.toLowerCase().includes(filter.toLowerCase()) )

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(p=>(p.name===newName)).length > 0 ) {
      if (window.confirm(`${newName} is already added to phonebook, ` +
      `replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
              displayNotification(`Updated number for ${person.name}`, 'notification')
            })
          .catch(error => {
            displayNotification(`Information of ${person.name} has already `+
            `been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService
        .create(person)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            displayNotification(`Added ${person.name}`, 'notification')
          })
    }
  }

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
            displayNotification(`Deleted ${name}`, 'notification')
          })
        .catch(error => {
          displayNotification(`Information of ${name} has already `+
          `been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type} 
        />
        <Filter filter={filter} handler={handleFilterChange}/>
      <h3>add a new</h3>
        <PersonForm
          addPerson={addPerson} 
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons
          filteredPersons={filteredPersons}
          removePerson={removePerson}
        />
    </div>
  )
}

export default App