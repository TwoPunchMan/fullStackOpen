require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
		.then(phonebook => {
			response.json(phonebook);
		})
		.catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
		.then(person => {
			response.json(person);
		})
		.catch(error => next(error));
});

app.get('/info', (request, response) => {
	Person.find({})
		.then(phonebook => {
			const numPeople = phonebook.length;
  		const timeStamp = new Date();
			const display =
				`<div>
					Phonebook has info for ${numPeople}<br/><br/>
					${timeStamp}
				</div>`
			response.send(display);
		})
		.catch(error => next(error));
});

const generateId = () => {
  return Math.floor(Math.random() * 10000) + 1;
}

app.post('/api/persons', (request, response, next) => {
  let person = request.body;
	const newPerson = new Person({
		id: generateId(),
		name: person.name,
		number: person.number
	})

  if (!person.name || !person.number) {
    return response.status(400).json({
			error: 'name/number missing'
		});
  }

	Person.find({}).then(p => {
		if (p.name === person.name) {
			return response.status(400).json({
				error: "name must be unique"
			});
		}
	});

	newPerson.save()
		.then(savedPerson => {
			response.json(savedPerson);
		})
		.catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

	const updatePerson = {
		id: body.id,
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(request.params.id, updatePerson, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson);
		})
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	next(error);
}

app.use(errorHandler);
