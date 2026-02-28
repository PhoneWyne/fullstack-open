// node mongo.js <mongoDb_pw> <personName> <phonenumber>

// incase of multiple arguments given, create a new phonebook entry
// incase of only password given, return list of all phonebook entries
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

// get password from console line arguments
const password = process.argv[2];

const url = `mongodb+srv://ahmed:${password}@cluster0.xgthcbc.mongodb.net/phonebook`

mongoose.set(`strictQuery`, false);

mongoose.connect(url, { family: 4});

// create a schema
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

// associate schema with model
const Phonebook = mongoose.model('Phonebook', phonebookSchema);

// function to create phonebook entry
const createPhonebook = ({ name, phone}) => {
    const person = new Phonebook({
        name: name,
        number: phone
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}
// function to return all phonebooks
const getAllPhonebook = () => {
    Phonebook
        .find({})
        .then(persons => {
            console.log("Phonebook:")
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}
// get arguments and create phonebook entry in db
const name = process.argv[3] ? process.argv[3] : undefined;
const phone =  process.argv[4] ? process.argv[4] : undefined;

// if name and phone passed, create a db entry
// if only password passed, return all list of phonebooks
if (!name || !phone) {
    getAllPhonebook()
} else {
    createPhonebook({
        name,
        phone
    })
}

