const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullStackOpen:${password}@cluster0.bpwbezj.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
	id: Number,
	name: String,
	number: String
});

const Person = mongoose.model('Person', phoneSchema);

const addNewPerson = () => {
	const generateId = () => {
		return Math.floor(Math.random() * 10000) + 1;
	}

	const person = new Person({
		id: generateId(),
		name: name,
		number: number
	});

	person.save().then(result => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
}

const displayAllPeople = () => {
	console.log("phonebook:");
	Person
		.find({})
		.then(result => {
			result.forEach(person => {
				console.log(`${person.name} ${person.number}`);
			});

			mongoose.connection.close();
		});
}

mongoose
	.connect(url)
	.then(() => {
		console.log('connected to mongoDB');

		if (process.argv.length === 3) {
			displayAllPeople();
		} else if (process.argv.length === 5) {
			addNewPerson();
		}
	})
	.catch(error => {
			console.log(error);
	});
