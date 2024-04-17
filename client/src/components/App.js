import React, { useEffect, useState } from 'react'
import apiService from '../services/api-service'
import Notification from './Notification'
import Search from './Search'
import Form from './Form'
import List from './List'

const App = () => {
  const [persons, setPersons] = useState([])

  const [searchList, setSearchList] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    apiService.getAll().then((response) => {
      setPersons(response)
      setSearchList(response)
    })
  }, [])

  const notifyUserWith = (message, type = 'success-notification') => {
    setNotify({ message, type })
    setTimeout(() => {
      setNotify(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const payload = { name: newName, number: newNumber }

    if (persons.some((person) => person.name === newName)) {
      //alert(`${newName} is already in phonebook`);
      const entry = persons.find(({ name }) => name === newName)

      if (
        window.confirm(
          `${newName} is already in phonebook, do you want to replace the number?`
        )
      ) {
        apiService
          .update(entry.id, payload)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== entry.id ? person : response.data
              )
            )
            notifyUserWith(
              `${newName} successfully updated`,
              'success-notification'
            )
          })
          .catch((error) => {
            /*  alert(
              `Sorry, ${entry.name} may have been deleted from the database`
            ); */
            notifyUserWith(
              `${error.response.data.error}`,
              'error-notification'
            )
            //setPersons(persons.filter((person) => person.id !== entry.id));
          })
      }
    } else {
      apiService
        .create(payload)
        .then((response) => {
          setPersons(persons.concat(response))
          notifyUserWith(
            `${newName} successfully added`,
            'success-notification'
          )
        })
        .catch((error) => {
          notifyUserWith(`${error.response.data.error}`, 'error-notification')
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
    const result = searchList.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setPersons(result)
  }

  return (
    <div>
      <Notification notify={notify} />
      <Search
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />
      <h2>Phonebook</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List
        persons={persons}
        setPersons={setPersons}
        notifyUserWith={notifyUserWith}
      />
    </div>
  )
}

export default App
