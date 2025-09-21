import Person from "./Person";

const Persons = ({ 
  persons,
  handleDelete
}) => {
  return (
    <ul>
      {persons.map((person) => (
        // provide key to list component
        <Person 
          key={person.id} 
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;
