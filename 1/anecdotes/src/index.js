import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const incrementVote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy) 
  }

  const getMostVotes = () => {
    const m = votes.indexOf(Math.max(...votes))
    return {anecdote: props.anecdotes[m], votes: votes[m]}
  }


  return (
    <div>
      <p><i>{props.anecdotes[selected]}</i></p>
      <button onClick={() => {incrementVote(selected)}}>vote</button>
      <button onClick={() => {setSelected(getRandomIndex(selected))}}>next anecdote plz</button>
      <p>votes: {votes[selected]}</p>
      <MostVotes mostVotedAnecdote={getMostVotes()}/>
    </div>
  )
}

const MostVotes = (props) => {
  const {anecdote,votes} = props.mostVotedAnecdote
  return (
    <div>
      <h1>anecdote with most votes:</h1>
      <p><i>{anecdote}</i></p>
      <p>has {votes} votes.</p>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomIndex = (current) => {
  let r = Math.floor(Math.random() * anecdotes.length) 
  if (r == current) return getRandomIndex(current)
  else return r
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)