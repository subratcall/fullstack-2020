const dummy = blogs => 1

const totalLikes = blogs => {
	const likes = blogs.map(blog => blog.likes)
	const sum = (total, item) => total + item
	return likes.reduce(sum, 0)
}

const favouriteBlog = blogs => {
	const likes = blogs.map(blog => blog.likes)
	return blogs.length === 0
		? 0
		: Math.max(...likes)
}

module.exports = { dummy, totalLikes, favouriteBlog }