import { useEffect, useState } from "react";
import numbersService from "./services/numbers";
// import Person from "./components/Person";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import numbers from "./services/numbers";


const App = () => {
  // state to control persons displayed, array of objects
  const [persons, setPersons] = useState([]);

  // state to control name input field
  const [newName, setNewName] = useState("");
  // state to control number input field
  const [newNumber, setNewNumber] = useState("");
  // state to control filter field
  const [filterName, setFilterName] = useState("");

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const fetchPersons =  () => {
    numbersService
      .getAll()
      .then(newPerson => setPersons(newPerson))
      .catch(error => console.error("Error in fetching persons: ", error));
  }

  useEffect(() => {
    fetchPersons();
  }, []);
  // update name input field state
  const handleNewName = (event) => {
    console.log(`name input field: ${event.target.value}`);
    setNewName(event.target.value);
  };
  // update number input field state
  const handleNewNumber = (event) => {
    console.log(`number input field: ${event.target.value}`);
    setNewNumber(event.target.value);
  };
  // update filter input field state
  const handleFilterName = (event) => {
    console.log(`filter input field: ${event.target.value}`);
    setFilterName(event.target.value);
  };

  // handle adding new person
  // 2 edge cases, preventing same name, and empty strings
  // check if person exists before post request is sent
  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);
    // ensure empty string isnt being added
    if (!newName) {
      alert("No name entered, enter a name then press add.");
      return;
    }
    const alreadyExist = persons.find(
      (person) => (person.name === newName) && (person.number === newNumber)
    )
    if (alreadyExist) {
      alert("Person with name and number being entered exists, please enter a unique person");
      resetForm();
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    numbersService
      .create(newPerson)      
      .then(newPerson => setPersons(persons.concat(newPerson)))
      .catch(error => console.error("Error in adding new person: ", error))
    resetForm()

  };

  const filterList = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );
  };

  const filteredPersons = !filterName ? persons : filterList();

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};
export default App;
