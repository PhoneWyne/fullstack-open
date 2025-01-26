const Greetings = (prop) => {
  return (
    <div>
      <p>Greetings {prop.name}</p>
    </div>
  );
};
const Addition = ({ a, b }) => {
  return (
    <div>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  );
};
const TodayDate = () => {
  const now = new Date();

  return (
    <div>
      <p>Today is {now.toString()}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Greetings name="Ahmed" />
      <Addition a={10} b={20} />
      <TodayDate />
    </div>
  );
};

export default App;
