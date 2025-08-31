import { useState } from "react";

// components
const Button = ({ name, onClick }) => (
  <button onClick={onClick}> {name} </button>
);

const Buttons = ({ feedbackOptionsMap }) =>
  feedbackOptionsMap.map((feedbackOption) => {
    return (
      <Button
        key={feedbackOption.name}
        name={feedbackOption.name}
        onClick={feedbackOption.setValue}
      />
    );
  });

const StatsField = ({ name, value }) => (
  <p>
    {name}: {value}
  </p>
);

const StatsFields = ({ feedbackStatisticMap }) =>
  feedbackStatisticMap.map((stat) => (
    <StatsField key={stat.name} name={stat.name} value={stat.value} />
  ));

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // is every options equal zero ? boolean
  const everyOptinsIsZero = good === 0 && neutral === 0 && bad === 0;

  const handleClick = (setValue) => () => setValue((prev) => prev + 1);

  // functions
  const summAllfeedBackOptions = () => good + neutral + bad;

  const calculateAvarageFeedbackOptions = () => {
    if (everyOptinsIsZero) return 0;
    return (good - bad) / summAllfeedBackOptions();
  };

  const calculatePositiveFeedbackOptions = () => {
    if (everyOptinsIsZero) return 0;
    return good / summAllfeedBackOptions();
  };

  const feedbackOptionsMap = [
    {
      name: "good",
      setValue: handleClick(setGood),
    },
    {
      name: "neutral",
      setValue: handleClick(setNeutral),
    },
    {
      name: "bad",
      setValue: handleClick(setBad),
    },
  ];

  const feedbackStatisticMap = [
    { name: "good", value: good },
    { name: "neutral", value: neutral },
    { name: "bad", value: bad },
    { name: "all", value: summAllfeedBackOptions() },
    { name: "average", value: calculateAvarageFeedbackOptions() },
    { name: "positive", value: calculatePositiveFeedbackOptions() + " %" },
  ];

  return (
    <div>
      <h1> give your feedback ! </h1>
      {<Buttons feedbackOptionsMap={feedbackOptionsMap} />}
      <h1> feedback statistic </h1>
      {<StatsFields feedbackStatisticMap={feedbackStatisticMap} />}
    </div>
  );
};

export default App;
