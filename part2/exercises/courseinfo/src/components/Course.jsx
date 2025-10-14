const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({part}) => {
    return(
        <li>{part.name} {part.exercises}</li>
    )
}

const Total = ({parts}) => {
  const initialValue = 0;
  const total = parts.reduce((total, part) => {
    return total += part.exercises;
  }, initialValue);
  // console.log(total);
  return(
    <h5>Total of {total} exercises</h5>
  )
}
const Course = ({ course }) => {
    const parts = course.parts;
  return (
    <>
      <Header name={course.name} />
      <ul>
        {/* name of courses and their exercises amount */}
        {parts.map(
          // using component with <li>, key is insstead passed to Component directly, not li tag anymore
            (part) => {return(<Part key={part.id} part={part}/>)}
        )}
        {/* Total exercises */}
        <Total parts={course.parts} />
      </ul>
    </>
  );
};
export default Course;
