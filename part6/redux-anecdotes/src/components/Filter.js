import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

/* Disconnected Component, requires useDispatch from redux */
// const Filter = () => {
// 	const dispatch = useDispatch()
// 	const handleChange = (event) => {
// 		dispatch(setFilter(event.target.value))
// 	}
// 	const style = {
// 		marginBottom: 10
// 	}

// 	return (
// 		<div style={style}>
// 			Filter: <input onChange={handleChange} />
// 		</div>
// 	)
// }

const Filter = (props) => {
	const handleChange = (event) => {
		props.setFilter(event.target.value)
	}
	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			Filter: <input onChange={handleChange} />
		</div>
	)
}

const mapDispatchToProps = {
	setFilter
}

export default connect(null, mapDispatchToProps)(Filter)