import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
}

const addPerson = (newPerson) => {
	const request = axios.post(baseUrl, newPerson);
	return request.then(response => response.data);
}

const updatePersonNumber = (id, updatePerson) => {
	const request = axios.put(`${baseUrl}/${id}`, updatePerson);
	return request.then(response => response.data);
}

const deletePerson = (person) => {
	const id = person.id;
	const request = axios.delete(`${baseUrl}/${id}`);

	return request.then(response => response.data);
}

const phonebookService = { getAll, addPerson, updatePersonNumber, deletePerson }
export default phonebookService;
