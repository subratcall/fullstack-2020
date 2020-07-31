import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)
	const toggleVisibility = () => {
		setVisible(!visible)
	}

	if (visible) {
		return (
			<div style={props.style}>
				{props.children}
				<button onClick={toggleVisibility}>{props.hideLabel}</button>
			</div>
		)
	} else {
		return (<div style={props.style}>
			{props.textLabel}
			<button onClick={toggleVisibility}>{props.showLabel}</button>
		</div>)
	}
}

Togglable.propTypes = {
	showLabel: PropTypes.string.isRequired,
	hideLabel: PropTypes.string.isRequired
}

export default Togglable