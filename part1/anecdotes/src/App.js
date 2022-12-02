import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <div>
        has {votes} votes
      </div>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0,0,0,0,0,0,0]);

  let maxIndex = 0;

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[maxIndex]) {
      maxIndex = i;
    }
  }

  const getRandInt = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const getAnecdote = () => {
    let num = getRandInt();
    setSelected(num);
  }

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteAnecdote} text='vote' />
      <Button handleClick={getAnecdote} text='next anecdote' />

      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]}/>
    </div>
  )
}

export default App;
