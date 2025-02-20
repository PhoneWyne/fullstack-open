// // returns Header component, with printing course name as header
// const Header = (props) => {
//   // console.log(`props : ${props.name}`);
//   return (
//     <div>
//       <h1>{props.name}</h1>
//     </div>
//   );
// };
// const Part = (props) => {
//   // RHS spreads out props into individual arguments, and LHS assigns them in order
//   const { name, exercises } = { ...props };
//   // console.log(exercises);
//   return (
//     <div>
//       <p>
//         {name} {exercises}
//       </p>
//     </div>
//   );
// };
// // returns Content of page, returning part name and number of exercises associated with each part
// // console.log(courses.part1.exercises)
// const Content = (props) => {
//   // console.log(props)
//   return (
//     <div>
//       {/* ...props.parts[0] takes each index of parts, which is parts[i] = {name:, exercises:} and spreads them out into separate props */}
//       {/* ...props.parts[0] basically is <Part name="Fundammental" exercises=10 /> */}
//       <Part {...props.parts[0]} /> 
//       <Part {...props.parts[1]} />
//       <Part {...props.parts[2]} />
//     </div>
//   );
// };

// // returns total amount of exercises in a course
// const Total = (props) => {
//   // console.log(props)
//   const total =
//     props.parts[0].exercises +
//     props.parts[1].exercises +
//     props.parts[2].exercises;
//   return (
//     <div>
//       <p>Total Exercises: {total}</p>
//     </div>
//   );
// };  

import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(
        (course) => {
          return(
            // now This is acting a list, anytime you are rendering a list, without li tag being there, you should provide a key
            <Course key={course.id} course={course}/>
          )
        }
      )}
    </div>
  )
};
export default App;
