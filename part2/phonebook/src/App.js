import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  const [newName, setNewName] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    if (newName === '') return;

    if (checkIfPersonExist(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName
    }

    setPersons(persons.concat(person));
    setNewName('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const checkEqual = (p1, p2) => {
    const p1Names = Object.getOwnPropertyNames(p1);
    const p2Names = Object.getOwnPropertyNames(p2);

    if (p1Names !== p2Names) return false;

    if (p1Names.length !== p2Names.length) return false;

    const hasAllKeys = p1Names.every(value => !!p2Names.find(v => v === value));
    if (!hasAllKeys) return false;

    for (const key of p1Names) if (p1[key] !== p2[key]) return false;

    return true;
  }

  const checkIfPersonExist = (findName) => {
    return persons.find(person => person.name === findName);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App;
