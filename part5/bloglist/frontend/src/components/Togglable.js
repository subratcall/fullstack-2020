import React, { useState } from 'react'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div style={props.style}>
			<div style={hideWhenVisible}>
				{props.textLabel}
				<button onClick={toggleVisibility}>{props.showLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>{props.hideLabel}</button>
			</div>
		</div>
	)
}

export default Togglable