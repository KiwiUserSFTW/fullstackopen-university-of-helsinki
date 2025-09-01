// compoentns
import Part from "./part/Part";

const Content = (props) =>
  props.parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));

export default Content;
