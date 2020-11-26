import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(
    p => p.name.toLowerCase().includes(filter.toLowerCase()) )

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(p=>(p.name===newName)).length > 0 ) {
      window.alert(`${newName} is already added to phonebook`)
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
          })
    }
  }

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
          .then(() => {
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
