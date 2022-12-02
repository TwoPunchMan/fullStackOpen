import { useState } from "react";

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

export default App;
