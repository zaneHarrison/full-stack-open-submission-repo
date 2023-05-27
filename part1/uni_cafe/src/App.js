import { useState } from 'react'

const Button = ({text, buttonAction}) => (
  <button onClick={buttonAction}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  let total = good + bad + neutral;

  return (
    <div>
      <h1>Statistics</h1>
      {total === 0 ? <p>No feedback given</p> : (
        <table>
          <tbody>
            <TableRow firstCellVal='Good' secondCellVal={good} />
            <TableRow firstCellVal='Neutral' secondCellVal={neutral} />
            <TableRow firstCellVal='Bad' secondCellVal={bad} />
            <TableRow firstCellVal='Total Reviews' secondCellVal={total} />
            <TableRow firstCellVal='Average' secondCellVal={(good - bad) / total} />
            <TableRow firstCellVal='Positive %' secondCellVal={(good / total) * 100} />
          </tbody>
        </table>
      )}
    </div>
  )
}

const TableRow = ({firstCellVal, secondCellVal}) => {
  return (
    <tr>
      <td>{firstCellVal}</td>
      <td>{secondCellVal}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button buttonAction={() => setGood(good + 1)} text='Good'/>
      <Button buttonAction={() => setNeutral(neutral + 1)} text='Neutral'/>
      <Button buttonAction={() => setBad(bad + 1)} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App