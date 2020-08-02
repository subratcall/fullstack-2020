import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	const message = props.notification.message
	const error = props.notification.error

	const style = {
		borderRadius: '5px',
		padding: '10px',
		background: 'lightgrey',
		marginBottom: '1rem'
	}
	if (error) {
		style.border = 'solid 2px red'
		style.color = 'red'
	} else {
		style.border = 'solid 2px green'
		style.color = 'green'
	}

	if (message === null) {
		return null
	} else {
		return (
			<div id="notification" style={style}>
				{message}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { notification: state.notification }
}

export default connect(mapStateToProps, null)(Notification) 