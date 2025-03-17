import { useEffect, useState } from "react";
import axios from "axios";

// import Person from "./components/Person";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
const App = () => {
  // state to control persons displayed, array of objects
  const [persons, setPersons] = useState([]);

  // state to control name input field
  const [newName, setNewName] = useState("");
  // state to control number input field
  const [newNumber, setNewNumber] = useState("");
  // state to control filter field
  const [filterName, setFilterName] = useState("");

  const fetchPersons = async () => {
    try{
      const response = await axios.get('http://localhost:3001/persons')
      if(response) {
        setPersons(response.data);
      }
    } catch(error) {
      console.error("Error in fetching data: ", error);
    }
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

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);
    // ensure empty string isnt being added
    if (newName) {
      console.log(`After submitting, new person name: ${newName}`);
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      // this will hold undefined if new name does not exist already
      const alreadyAdded = persons.find(
        (person) => person.name === newPerson.name
      );
      if (!alreadyAdded) {
        console.log("new name does not exist in storage");
        // create copy of persons array and add newpersons obj to it
        setPersons(persons.concat(newPerson));
      } else {
        alert(`${newName} does exist in storage, try again.`);
      }

      // reset input field
      setNewName("");
    } else {
      alert("No name entered, enter a name then press add.");
    }
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
