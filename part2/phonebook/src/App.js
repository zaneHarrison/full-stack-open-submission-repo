import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import axios from 'axios'
import personsService from './services/persons';
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      let personToUpdate = persons.filter(person => person.name === newName)[0];
      let updateMessage = null;
      if (window.confirm(`${newName} is already a contact. Would you like to replace their number?`)) {
        personsService
          .update(personToUpdate.id, personObject)
          .then(newPerson => {
            setPersons(persons.map(person => {
              if (newPerson.id === person.id) {
                return newPerson;
              } else {return person;}
            }))
          })
          .then(() => updateMessage = `${personToUpdate.name}'s contact has been updated.`)
          .catch(error => {
            setErrorMessage('This contact no longer exists.')
            setPersons(persons.filter(person => person.id !== personToUpdate.id));
            updateMessage = null;
          })
        setSuccessMessage(updateMessage);
      } else {return;}
    } else {
      personsService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");    
        });
      setSuccessMessage(`${personObject.name} has been added as a contact.`);
    }
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Are you sure you want to delete this contact? (${contact.name})`)) {
      personsService
      .remove(contact.id)
      .then(() => {
        setPersons(persons.filter((person) => person.id != contact.id))
      });
    }
    setSuccessMessage(`${contact.name} has been removed from contacts.`)
  }

  setTimeout(() => setSuccessMessage(null), 3000);
  setTimeout(() => setErrorMessage(null), 3000);

  return (
    <div style={{ marginLeft: '2rem'}}>
      <h1>Phonebook</h1>
      <Filter 
        filterText={filterText} handleFilterChange={handleFilterChange}
      />
      <h2>Add Contact</h2>
      <ContactForm 
        submitAction={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Contacts 
        persons={persons}
        filterText={filterText}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App