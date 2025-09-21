// deconstruct props into {person}, to access person object directly
const Person = ({
    person,
    handleDelete
}) => {
    const confirmDelete = (event, personId) => {
        const isDelete = window.confirm(`Do you want to delete ${person.name}?"`)
        if(!isDelete) {
            return;
        }
        handleDelete(event, personId)
    }
    return(
        <li>{person.name} {person.number} 
            <span>
                <button 
                    type="button"
                    onClick={(event) => confirmDelete(event, person.id)}
                >
                    delete
                </button>
            </span>
        </li>
    )
}
export default Person;