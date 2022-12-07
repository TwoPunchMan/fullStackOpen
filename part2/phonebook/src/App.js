import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [filterInEffect, setFilterStatus] = useState(false);

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response GET fulfilled');
        setPersons(response.data);
      });
  }

  useEffect(hook, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    if (newName === '') return;

    if (checkIfPersonExist(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newPhone
    }

    setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    if (search.length === 0) {
      setFilterStatus(false);
    } else {
      setFilterStatus(true);
    }
  }

  const personsToShow = filterInEffect
    ? persons.filter(person =>
        person.name.toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      )
    : persons;

  const checkIfPersonExist = (findName) => {
    return persons.find(person => person.name === findName);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChangeFunc={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm addPerson={addNewPerson} values={[newName, newPhone]} onChangeFunc={[handlePersonChange, handlePhoneChange]} />

      <h3>Numbers</h3>
      <Persons people={personsToShow} />
    </div>
  )
}

export default App;
