import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import axios from 'axios'
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

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
      }
    } else {
      personsService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");    
        });
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
  }

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
      <Contacts 
        persons={persons}
        filterText={filterText}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App