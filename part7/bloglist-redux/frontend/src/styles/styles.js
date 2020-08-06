import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.h1`
	font-size: 2.5em;
	color: salmon;
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	margin: 0 0.2em;
	color: black;

	&:hover, &:active {
        color: salmon;
    }
`

export const Button = styled.button`
	background: lightgray;
	font-size: 1em;
	margin-top: 1em;
	padding: 0.25em 1em;
	border: 2px solid gray;
	border-radius: 3px;
`

export const MenuDiv = styled.div`
	padding: 1em;
	
`