// components
import Total from "../../../total/Total";
import Header from "../../../header/Header";
import Content from "../../Content";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
