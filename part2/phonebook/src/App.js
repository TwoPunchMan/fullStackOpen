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
  const [message, setMessage] = useState(null);


  const loadPhonebook = () => {
    phonebookService
      .getAll()
      .then(phonebook => {
        setPersons(phonebook);
      })
  }

  useEffect(loadPhonebook, []);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() =>
      setMessage(null)
    , 5000);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personAlreadyExist = checkIfPersonExist(newName);
    console.log(personAlreadyExist);
    if (newName === '') {
      return;
    }

    if (personAlreadyExist) {
      updatePerson(personAlreadyExist);
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone
    }

    phonebookService
      .addPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
        notify(`Added ${newPerson.name}`)
      })
      .catch(error => {
        notify(`${error}`)
      })
  }

  const updatePerson = (person) => {
    const changedPerson = {...person, number: newPhone};
    const updateMsg = `${person.name} is already added to phonebook,
      replace the old number with a new one?`

    if (window.confirm(updateMsg)) {
      phonebookService
        .updatePersonNumber(person.id, changedPerson)
        .then(updatePeople => {
          setPersons(updatePeople);
          notify(`Updated number for ${changedPerson.name}`)
          setNewName('');
          setNewPhone('');
        })
        .catch(error => {
          notify(`wtf`)
        })
    }
  }

  const deletePerson = (person) => {
    const name = person.name;
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService
        .deletePerson(person)
        .then(() => {
          notify(`${name} has been deleted`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          notify(`Information of ${person.name} has already been removed from server`)
        })
    }
  }

  const Notification = ({ msg }) => {
    const notificationCSS = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (msg === null) {
      return null;
    }

    return (
      <div className='notification' style={notificationCSS} >
        {msg}
      </div>
    )
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
    return persons.find(person => person.name.toLowerCase() === findName.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message} />
      <Filter search={search} onChangeFunc={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm addPerson={addNewPerson} values={[newName, newPhone]} onChangeFunc={[handlePersonChange, handlePhoneChange]} />

      <h3>Numbers</h3>
      <Persons people={personsToShow} deleteFunc={deletePerson} />
    </div>
  )
}

export default App;
