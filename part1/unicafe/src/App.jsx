import { useState } from "react";

const Button = ({ name, onClick }) => (
  <button onClick={onClick}> {name} </button>
);

const Buttons = ({ feedbackMap }) =>
  feedbackMap.map((feedbackOption) => (
    <Button
      key={feedbackOption.name}
      name={feedbackOption.name}
      onClick={feedbackOption.setValue}
    />
  ));

const StatsField = ({ name, value }) => (
  <p>
    {name}: {value}
  </p>
);

const StatsFields = ({ feedbackMap }) =>
  feedbackMap.map((feedbackOption) => (
    <StatsField
      key={feedbackOption.name}
      name={feedbackOption.name}
      value={feedbackOption.value}
    />
  ));

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value, setValue) => () => setValue(value + 1);

  const feedbackMap = [
    {
      name: "good",
      value: good,
      setValue: handleClick(good, setGood),
    },
    {
      name: "neutral",
      value: neutral,
      setValue: handleClick(neutral, setNeutral),
    },
    {
      name: "bad",
      value: bad,
      setValue: handleClick(bad, setBad),
    },
  ];

  return (
    <div>
      <h1> give your feedback ! </h1>
      {<Buttons feedbackMap={feedbackMap} />}

      <h1> feedback statistic </h1>
      {<StatsFields feedbackMap={feedbackMap} />}
    </div>
  );
};

export default App;
