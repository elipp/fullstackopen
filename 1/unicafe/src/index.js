import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticLine =({text,value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({stats}) => {
  const {g,n,b} = stats
  const score = () => (1 * g) + (0 * n) + ((-1) * b)
  const numVotes = () => g + n + b
  const average = () => (100.0*(score()/numVotes())).toFixed(2).toString() + "%"
  if (numVotes() == 0) { return <div><h1>no feedback given :(</h1></div> }
  return (
    <div>
      <h1>statistics</h1>
      <table><tbody>
      <StatisticLine text="good" value={g}/>
      <StatisticLine text="neutral" value={n}/>
      <StatisticLine text="bad" value={b}/>
      <StatisticLine text="all" value={numVotes()}/>
      <StatisticLine text="Average" value={average()}/>
      </tbody></table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const state = {
    g: good,
    n: neutral,
    b: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} clickHandler={() => setGood(good + 1)} />
      <Button text={"neutral"} clickHandler={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} clickHandler={() => setBad(bad + 1)} />
      <Statistics stats={state} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)