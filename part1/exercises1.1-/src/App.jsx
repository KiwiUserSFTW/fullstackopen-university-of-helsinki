// App components
const Header = (props) => (<h1>{props.course}</h1>);

// Content components
const Part = (props) => (<p> {props.part} {props.exercises} </p>);

const Content = (props) => (
  <>
    <Part part={props.parts.part1} exercises={props.exercises.exercises1}/>
    <Part part={props.parts.part2} exercises={props.exercises.exercises2}/>
    <Part part={props.parts.part3} exercises={props.exercises.exercises3}/>
  </>
);

const Total = (props) => (
  <>
    <p>
      Number of exercises: {props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3}
    </p>
  </>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        exercises={{ exercises1, exercises2, exercises3 }}
        parts={{ part1, part2, part3 }}
      />
      <Total exercises={{ exercises1, exercises2, exercises3 }} />
    </div>
  );
};

export default App;
