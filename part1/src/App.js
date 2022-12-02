import { useState } from "react";

/*
const Header = (props) => {
  console.log(props)
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
*/

/*const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
*/

// Unicafe App
/*
const Button = ({ handleClickFunc, text }) => (
  <button onClick={handleClickFunc}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({ array, score, feedback }) => {

  const [good, neutral, bad] = array;
  let total = good + neutral + bad;

  if (feedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <thead></thead>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={score / total} />
        <StatisticLine text="positive" value={good / total * 100} />
      </tbody>

    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setScore(score + 1);
    setTotal(total + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
    setScore(score - 1);
    setTotal(total + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClickFunc={handleGoodClick} text='good' />
      <Button handleClickFunc={handleNeutralClick} text='neutral' />
      <Button handleClickFunc={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics array={[good, neutral, bad]} score={score} feedback={total} />
    </div>
  )
}
*/

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
