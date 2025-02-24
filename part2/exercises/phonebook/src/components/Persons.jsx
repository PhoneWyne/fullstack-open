import Person from "./Person";
const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        // provide key to list component
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
