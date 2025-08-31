// react
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

const StatsLine = ({ name, value }) => (
  <p>
    {name}: {value}
  </p>
);

const StatsLines = ({ feedbackStatisticMap }) =>
  feedbackStatisticMap.map((stat) => (
    <StatsLine key={stat.name} name={stat.name} value={stat.value} />
  ));

const Statistics = ({ good, neutral, bad }) => {
  // is every options equal zero ? boolean
  const everyOptionsIsZero = good === 0 && neutral === 0 && bad === 0;

  // functions
  const summAllfeedBackOptions = () => good + neutral + bad;

  const calculateAvarageFeedbackOptions = () => {
    if (everyOptionsIsZero) return 0;
    return (good - bad) / summAllfeedBackOptions();
  };

  const calculatePositiveFeedbackOptions = () => {
    if (everyOptionsIsZero) return 0;
    return (good / summAllfeedBackOptions()) * 100;
  };

  const feedbackStatisticMap = [
    { name: "good", value: good },
    { name: "neutral", value: neutral },
    { name: "bad", value: bad },
    { name: "all", value: summAllfeedBackOptions() },
    { name: "average", value: calculateAvarageFeedbackOptions() },
    { name: "positive", value: calculatePositiveFeedbackOptions() + " %" },
  ];

  if (everyOptionsIsZero) {
    return (
      <div>
        <h1>feedback statistic</h1>
        <h2>No feedback given</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>feedback statistic</h1>
      <StatsLines feedbackStatisticMap={feedbackStatisticMap} />
    </div>
  );
};

const FeedbackOptions = ({ setGood, setNeutral, setBad }) => {
  const handleClick = (setValue) => () => setValue((prev) => prev + 1);

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

  return (
    <div>
      <h1> give your feedback ! </h1>
      {<Buttons feedbackOptionsMap={feedbackOptionsMap} />}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <FeedbackOptions
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
