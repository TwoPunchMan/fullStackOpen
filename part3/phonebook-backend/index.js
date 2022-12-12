const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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
app.use(express.static('build'));
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
  ].join(' ')
}));
app.use(cors());

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
	let person = request.body;
	person.id = generateId();

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

	phonebook = phonebook.concat(person);

	response.json(person);
});

app.put('/api/persons/:id', (request, response) => {
	const updatedPerson = request.body;
	const index = phonebook.findIndex(p => p.name === updatedPerson.name);

    phonebook[index] = updatedPerson;

    response.json(phonebook);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);

	phonebook = phonebook.filter(person =>
		person.id !== id
	);

	response.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`)
});
