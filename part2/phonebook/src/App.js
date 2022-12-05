import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [filterInEffect, setFilterStatus] = useState(false);

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
