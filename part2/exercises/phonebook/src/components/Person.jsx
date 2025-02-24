// deconstruct props into {person}, to access person object directly
const Person = ({person}) => {
    return(
        <li>{person.name} {person.number}</li>
    )
}
export default Person;