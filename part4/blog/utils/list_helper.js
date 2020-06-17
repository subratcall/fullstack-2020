const dummy = blogs => 1

const totalLikes = blogs => {
	const likes = blogs.map(blog => blog.likes)
	const sum = (total, item) => total + item
	return likes.reduce(sum, 0)
}

module.exports = { dummy, totalLikes }