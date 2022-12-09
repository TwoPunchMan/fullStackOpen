const Persons = ({ people, deleteFunc }) => {
  return (
    <div>
      {people.map(person =>
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => deleteFunc(person)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons;
