import { useEffect, useState } from "react";
import numbersService from "./services/numbers.js";
// import Person from "./components/Person";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  // state to control persons displayed, array of objects
  const [persons, setPersons] = useState([]);

  // state to control name input field
  const [newName, setNewName] = useState("");
  // state to control number input field
  const [newNumber, setNewNumber] = useState("");
  // state to control filter field
  const [filterName, setFilterName] = useState("");
  // state to control messages
  const [message, setMessage] = useState(null);
  // state to set states for response - success/error
  const [responseState, setResponseState] = useState(null);
  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  }

  
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

  const fetchPersons =  () => {
    numbersService
      .getAll()
      .then(newPerson => setPersons(newPerson))
      .catch(error => console.error("Error in fetching persons: ", error));
  }

  // handle adding new person
  const addPerson = (event) => {
    event.preventDefault();
    // ensure empty string isnt being added
    if (!newName || !newNumber) {
      alert("No name entered, enter a name then press add.");
      return;
    }
    // check to see if person name exists already // ask to replace number if it does
    // yes => update number, no => return
    const alreadyExist = persons.find(
      (person) => (person.name === newName) 
    )
    // if (!alreadyExist?.number) {
    //   alert("No number was entered, enter a number");
    //   return;
    // }
    // updating an existing person
    if (alreadyExist) {
      const isReplace = window.confirm(`${newName} is already added to phonebook. Do you want to replace phone number?`)
      if (!isReplace){
        alert("Person with name being entered exists, please enter a unique person");
        resetForm();
        return;
      }
      const updatedPerson = {
        ...alreadyExist,
        number: newNumber,
      }

      numbersService
        .updatePerson(updatedPerson)
        .then(updatedPerson => {
          // remove existing person from persons state and only add updated object
          const newPersons = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person);
          setPersons(newPersons);
        })
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from the server.`);
          setResponseState('errorMsg');
          
          setTimeout(() => {
            setMessage(null);
            setResponseState(null);
          }, 5000);
        });

      resetForm();
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    numbersService
      .create(newPerson)      
      .then(newPerson => {
        setMessage(`Added ${newPerson.name}`)
        setResponseState('successMsg');

        // remove message after timeout
        setTimeout(() => {
          setMessage(null);
          setResponseState(null);
        }, 5000);

        setPersons(persons.concat(newPerson))
      })
      .catch(error => console.error("Error in adding new person: ", error))
    resetForm()

  };
  
  // edge case, id might already been deleted by some other user
  const deletePerson = (event, id) => {
    // console.dir("button pressed: ", event);
    console.log("Person ID being deleted: ", id);
    event.stopPropagation();
    const personExists = persons.find(person => person.id === id);
    // current user might be viewing outdated list, while another user has deleted person
    if(!personExists) {
      alert("Person has already been deleted");
      // remove persons from existing list of person,
      setPersons(persons.filter(person => person.id !== id));
    }

    numbersService
      .deletePerson(id)
      .then(deletedPerson => {
        const newPersons = persons.filter(person => person.id !== deletedPerson.id)
        setPersons(newPersons)
      })
      .catch(error => console.error("Error in deleting person: ", error));

  }

  useEffect(() => {
    fetchPersons();
  }, []);

  const filterList = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );
  };

  const filteredPersons = !filterName ? persons : filterList();

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        className={responseState}
      />
      <Filter
        filterName={filterName} 
        handleFilterName={handleFilterName}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons} 
        handleDelete={deletePerson}
      />
    </div>
  );
};
export default App;
