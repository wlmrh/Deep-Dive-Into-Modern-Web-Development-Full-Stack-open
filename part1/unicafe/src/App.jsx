import { useState } from 'react'

const StatisticLine = ({text, value}) => {
	return(
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad, total}) => {
	if (total === 0){
		return(
			<div>No feedback given</div>
		)
	}
	return(
		<table>
			<tbody>
				<StatisticLine text="good" value={good}/>
				<StatisticLine text="neutral" value={neutral}/>
				<StatisticLine text="bad" value={bad}/>
				<StatisticLine text="all" value={total}/>
				<StatisticLine text="average" value={total !== 0 ? (good - bad) / total : 0}/>
				<StatisticLine text="positive" value={`${Number(total !== 0 ? good / total * 100 : 0).toFixed(1)}%`}/>
			</tbody>
		</table>
	)
}

const App = () => {
	// save clicks of each button to its own state

	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [total, setTotal] = useState(0)

	const handleGood = () => {
		const newGood = good + 1
		setGood(newGood)
		setTotal(total + 1)
	}

	const handleNeutral = () => {
		const newNeutral = neutral + 1
		setNeutral(newNeutral)
		setTotal(total + 1)
	}

	const handleBad = () => {
		const newBad = bad + 1
		setBad(newBad)
		setTotal(total + 1)
	}

	return (
	<div>
		<h1>give feedback</h1>
		<button onClick={handleGood}>good</button>
		<button onClick={handleNeutral}>neutral</button>
		<button onClick={handleBad}>bad</button>

		<h1>statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} total={total}/>
	</div>
	)
}

export default App