import React from 'react'

const Person = ({person, remove}) => {
  return (
    <li>
      {person.name} {person.number} 
      <button onClick={remove}>delete</button>
    </li>
  )
}

const Persons = ({filteredPersons, removePerson}) => {
  return (
    <ul>
      {filteredPersons.map((person) =>
        <Person
          key={person.id}
          person={person} 
          remove={() => removePerson(person.name, person.id)}
        />
      )}
    </ul>
  )

}

export default Persons