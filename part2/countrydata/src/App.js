import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
	const [countries, setCountries] = useState([])
	const [filtered, setFiltered] = useState(countries)
	const hook = () => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
				setFiltered(response.data)
			})
	}
	useEffect(hook, [])

	const handleClick = (event) => {
		setFiltered(countries.filter(
			country => country.name === event.target.id
		))
	}

	const filterChange = (event) => {
		setFiltered(countries.filter(
			country => country.name.toLowerCase().includes(event.target.value.toLowerCase())
		))
	}

	return (
		<>
			<h2>Search Country</h2>
			<Filter
				filterChange={filterChange}
			/>

			<h2>Results</h2>
			<Countries countries={filtered} handleClick={handleClick} />
		</>
	)
}

export default App