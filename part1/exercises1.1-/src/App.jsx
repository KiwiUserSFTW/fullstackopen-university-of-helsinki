// App components
const Header = (props) => <h1>{props.course}</h1>;

// Content components
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) =>
  props.parts.map((part) => (
    <Part key={part.name} part={part.name} exercises={part.exercises} />
  ));

const Total = (props) => (
  <>
    <p>
      Number of exercises:{" "}
      {props.parts.reduce((sum, part) => {
        sum += part.exercises;
        return sum;
      }, 0)}
    </p>
  </>
);

const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
