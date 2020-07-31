import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'


let toggleComponent

beforeEach(() => {
	const blog = {
		author: "Thiv",
		title: "react-test",
		url: "test.com",
		likes: 10
	}

	toggleComponent = render(
		<Togglable textLabel={`${blog.title} ${blog.author}`}
			showLabel="Show" hideLabel="Hide">
			<Blog blog={blog} />
		</Togglable>
	)

})

test('only title & author shown on default', () => {
	expect(toggleComponent.container).toHaveTextContent('react-test Thiv')
	expect(toggleComponent.container).not.toHaveTextContent('test.com')
	expect(toggleComponent.container).not.toHaveTextContent('10')
})

test('show full blog on click', () => {
	expect(toggleComponent.container).toHaveTextContent('react-test Thiv')
	const button = toggleComponent.getByText('Show')
	fireEvent.click(button)

	expect(toggleComponent.container).toHaveTextContent('react-test Thiv')
	expect(toggleComponent.container).toHaveTextContent('10')
	expect(toggleComponent.container).toHaveTextContent('test.com')
})

test('like button calls', () => {
	const mockHandler = jest.fn()
	const testBlog = {
		author: "Thiv",
		title: "react-test",
		url: "test.com",
		likes: 10
	}

	const testToggle = render(
		<Togglable textLabel={`${testBlog.title} ${testBlog.author}`}
			showLabel="show" hideLabel="Hide">
			<Blog blog={testBlog} update={mockHandler} />
		</Togglable>
	)

	const showBtn = testToggle.getByText('show')
	fireEvent.click(showBtn)

	const likeBtn = testToggle.getByText('Like')
	fireEvent.click(likeBtn)
	fireEvent.click(likeBtn)
	expect(mockHandler.mock.calls).toHaveLength(2)
})