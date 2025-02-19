import { useState } from "react";

// Header component to display header
const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

// Button component to handle state update and text
const Button = ({ text, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

// List item to display counts for each category
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

// component to display statistics
const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && bad == 0 && neutral == 0) {
    return <div>No feedback given</div>;
  }
  const total = good + bad + neutral;
  // const score = (good * 1) + (bad * -1) + (neutral * 0);
  const score = good - bad;
  const average = score / total;
  const positive = (good / total) * 100;
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All"} value={total} />
          <StatisticLine text={"Average"} value={average} />
          <StatisticLine text={"Positive"} value={positive} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text={"give feedback"} />
      <Button text={"Good"} onClick={handleGoodClick} />
      <Button text={"Neutral"} onClick={handleNeutralClick} />
      <Button text={"Bad"} onClick={handleBadClick} />

      <Header text={"statistics"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
