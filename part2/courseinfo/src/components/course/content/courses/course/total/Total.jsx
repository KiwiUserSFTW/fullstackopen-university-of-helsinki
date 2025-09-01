const Total = (props) => {
  // reduce array method to calculate summary
  const summary = props.parts.reduce((sum, part) => (sum += part.exercises), 0);

  return <h4>total of {summary} exercises</h4>;
};

export default Total;
