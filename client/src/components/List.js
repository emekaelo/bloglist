import React from 'react'
import apiService from '../services/api-service'

const List = ({ persons, setPersons, notifyUserWith }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <Persons
            persons={persons}
            key={person.id}
            person={person}
            setPersons={setPersons}
            notifyUserWith={notifyUserWith}
          />
        )
      })}
    </ul>
  )
}

const Persons = ({ person, setPersons, persons, notifyUserWith }) => {
  const remove = (id, name) => () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      apiService
        .deleteItem(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id)
          setPersons(newPersons)
          notifyUserWith(
            `${name} successfully deleted`,
            'success-notification'
          )
        })
        .catch(() => {
          notifyUserWith(
            `Sorry, ${name} may have been deleted from the database`,
            'error-notification'
          )
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={remove(person.id, person.name)}>Delete</button>
    </li>
  )
}

export default List
