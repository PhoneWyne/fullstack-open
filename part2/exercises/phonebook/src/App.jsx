import { useState } from "react";
import Person from "./components/Person";
const App = () => {
  // state to control persons displayed, array of objects
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  // state to control name input field
  const [newName, setNewName] = useState("");
  // state to control number input field
  const [newNumber, setNewNumber] = useState("");
  // state to control filter field
  const [filterName, setFilterName] = useState("");

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
  }
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
    // console.log(`filter Name being handled by filterList(): ${filterName}`);    
    // const list = persons.filter((person)=> person.name.toLowerCase().includes(filterName.toLowerCase()));
    // console.log("filtered list: ", list);
    return persons.filter((person)=> person.name.toLowerCase().includes(filterName.toLowerCase()));

  };
  // console.log("Results of filterList(): ", filterList());
  const filteredPersons = !filterName ? persons : filterList();
  // console.log("filtered persons: " , filteredPersons);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterName}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          // provide key to list component
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};
export default App;
