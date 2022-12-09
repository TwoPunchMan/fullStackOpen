import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
}

const addPerson = (newPerson) => {
	const request = axios.post(baseUrl, newPerson);
	return request.then(response => response.data);
}

const updatePerson = (person) => {
	const request = axios.put(`${baseUrl}/${person.id}`, person);
	return getAll();
}

const deletePerson = (id) => {
	axios.delete(`${baseUrl}/${id}`);
	return getAll();
}

export default { getAll, addPerson, updatePerson, deletePerson };
