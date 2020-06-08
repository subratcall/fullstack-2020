import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ title, handleClick }) => <button onClick={handleClick}>{title}</button>

const Statistic = ({ text, value }) => <tr><td>{text} </td> <td>{value}</td></tr>

const Statistics = ({ good, bad, neutral }) => {
  const sum = good + neutral + bad
  if (sum == 0) {
    return <p>No feedback given.</p>
  } else {
    const avg = (good - bad) / sum
    const pos = good / sum

    return <>
      <Header title="Statistics" />
      <table>
        <Statistic text="Good:" value={good} />
        <Statistic text="Neutral:" value={neutral} />
        <Statistic text="Bad:" value={bad} />
        <Statistic text="All:" value={sum} />
        <Statistic text="Average:" value={avg} />
        <Statistic text="Positive:" value={pos + ' %'} />
      </table>
    </>
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <Header title="Feedback" />
      <Button title="Good" handleClick={handleGood} />
      <Button title="Neutral" handleClick={handleNeutral} />
      <Button title="Bad" handleClick={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
