import { useState } from "react";

const Display = (props) => {
  return <div>{props.counter}</div>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter - 1);

  console.log(`rendering....${counter}`);
  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text={"Increment"} />
      <Button onClick={setToZero} text={"Reset"} />
      <Button onClick={decreaseByOne} text={"Decrement"} />
    </div>
  );
};

export default App;
