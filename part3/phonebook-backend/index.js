const express = require('express');
const morgan = require('morgan');
const app = express();


let phonebook = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

app.use(express.json());

app.get('/api/persons', (request, response) => {
	response.json(phonebook);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);

	const person = phonebook.find(person => {
		return person.id === id;
	});

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.get('/info', (request, response) => {
	const numPeople = phonebook.length;
	const timeStamp = new Date();

	const display =
		`<div>
			Phonebook has info for ${numPeople}<br/><br/>
			${timeStamp}
		</div>`

	response.send(display);
});

const generateId = () => {
	return Math.floor(Math.random() * 10000) + 1;
}

app.post('/api/persons', (request, response) => {
	const person = request.body;

	if (!person.name || !person.number) {
		return response.status(400).json({
			error: 'name/number missing'
		});
	}

	const isNameExist = phonebook.find(p => {
		return person.name === p.name;
	});

	if (isNameExist) {
		return response.status(400).json({
			error: "name must be unique"
		});
	}

	const addPerson = {
		name: person.name,
		number: person.number,
		id: generateId()
	}

	phonebook = phonebook.concat(addPerson);

	response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);

	phonebook = phonebook.filter(person =>
		person.id !== id
	);

	response.status(204).end();
});

const PORT = 3001
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`)
});
