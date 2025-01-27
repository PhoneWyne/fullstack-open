// returns Header component, with printing course name as header
const Header = (props) => {
  console.log(`props : ${props.name}`);
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};
// returns Content of page, returning part name and number of exercises associated with each part
// console.log(courses.part1.exercises)
const Content = (props) => {
  // console.log(props)
  return (
    <div>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </div>
  );
};

// returns total amount of exercises in a course
const Total = (props) =>{
  // console.log(props)
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return(
    <div>
      <p>Total Exercises: {total}</p>
    </div>
  )
}
const App = () => {
  const courses = {
    courseName : "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header name= {courses.courseName} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts}/>
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  );
};

export default App;
