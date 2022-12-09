const PersonForm = ({ addPerson, values, onChangeFunc }) => {
	const [ newName, newPhone ] = [...values];
	const [ handlePersonChange, handlePhoneChange ] = [...onChangeFunc];

	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={handlePersonChange} />
			</div>
			<div>
				number: <input value={newPhone} onChange={handlePhoneChange}/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm;
