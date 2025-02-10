import { useState } from "react";
const getRandomIntInclusive = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
// Finding index of max votes
const findMaxVoteIndex = (arr) => {
  // starting with assuming 1st value of array is max
  let maxVote = arr[0];
  let maxVoteIndex = 0;
  for (let i = 0; i < arr.length; i++){
    // console.log(`current max vote: ${maxVote} vs current array value ${arr[i]}`);
    if (arr[i] >= maxVote){
      maxVote = arr[i];
      maxVoteIndex = i;
    }
  }
  return maxVoteIndex;
};
const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Quote = ({quote}) => {
  return <p>{quote}</p>
};

const VoteCount = ({count}) =>{
  return <p>has {count} votes</p>
}
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // select a random value, and set it to selected state
  const handleNextAnecdote = () => {
    const anecdoteArrayPosn = getRandomIntInclusive(0, anecdotes.length - 1);
    console.log(`Next selected anecodte array position: ${anecdoteArrayPosn}`);
    setSelected(anecdoteArrayPosn);
  };
  // update votes based on how many times vote button is pressed
  const handleVote = () => {
    // create copy of old votes array
    const newVotes = [...votes];
    // update matcing selected anecdote count
    newVotes[selected] += 1;
    // update variable
    setVotes(newVotes);
  };
  // console.log(`Current Votes array is ${votes}`);
  // console.log(`Index of max votes are ${maxVoteIndex(votes)}`);
  const maxVoteIndex = findMaxVoteIndex(votes);
  return (
    <div>
      <Heading text={"Anecdote of the day"} />
      
      <Quote quote={anecdotes[selected]} />
      <VoteCount count={votes[selected]}/>
      <Button text={"vote"} onClick={handleVote} />
      <Button text={"next anecdote"} onClick={handleNextAnecdote} />
      <Heading text={"Anecdote with most votes"} />
      <Quote quote={anecdotes[maxVoteIndex]} />
      <VoteCount count={votes[maxVoteIndex]} />
    </div>
  );
};

export default App;
