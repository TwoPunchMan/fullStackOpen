import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [filterInEffect, setFilterStatus] = useState(false);

  const loadPhonebook = () => {
    phonebookService
      .getAll()
      .then(phonebook => {
        setPersons(phonebook);
      })
  }

  useEffect(loadPhonebook, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const personAlreadyExist = checkIfPersonExist(newName);

    if (newName === '') {
      return;
    }

    if (personAlreadyExist) {
      updatePerson(personAlreadyExist);
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }

    phonebookService
      .addPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
      });
  }

  const updatePerson = (person) => {
    const changedPerson = {...person, number: newPhone};

    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      phonebookService
        .updatePerson(changedPerson)
        .then(updatePeople => {
          setPersons(updatePeople);
        });
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService
        .deletePerson(person.id)
        .then(people => {
          setPersons(people);
        });
    }
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
      <Persons people={personsToShow} deleteFunc={deletePerson} />
    </div>
  )
}

export default App;
