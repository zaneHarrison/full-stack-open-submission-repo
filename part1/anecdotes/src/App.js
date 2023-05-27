import { useState } from 'react'

const Button = ({text, buttonEvent}) => (
  <button onClick={buttonEvent}>{text}</button>
)

const AnecdoteWithMostVotes = ({mostVotes, votes, anecdotes}) => {
  let highestIdx = -1;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > mostVotes) {
      mostVotes = votes[i];
      highestIdx = i;
    }
  }

  return (
    <p>{anecdotes[highestIdx]}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = -1;

  const getRandomAnecdote = () => {
    const min = 0;
    const max = anecdotes.length;
    const range = max - min;
    const randomNumber = Math.floor(Math.random() * range);
    const randomInt = randomNumber + min;
    setSelected(randomInt);
  }

  const voteForAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes.</p>
      <br />
      <Button text='Vote' buttonEvent={voteForAnecdote} />
      <Button text='Next Anecdote' buttonEvent={getRandomAnecdote} />
      <h1>Anecdote with the most votes</h1>
      <AnecdoteWithMostVotes mostVotes={mostVotes} votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App