const arrayMax = array => {
	return array.length === 0
		? 0
		: Math.max(...array)
}

const dummy = blogs => 1

const totalLikes = blogs => {
	const likes = blogs.map(blog => blog.likes)
	const sum = (total, item) => total + item
	return likes.reduce(sum, 0)
}

const favouriteBlog = blogs => {
	const likes = blogs.map(blog => blog.likes)
	return arrayMax(likes)
}

const mostBlogs = blogs => {
	const uniqueAuthors = {}
	blogs.forEach(blog => {
		if (blog.author in uniqueAuthors) {
			uniqueAuthors[blog.author] += 1
		} else {
			uniqueAuthors[blog.author] = 1
		}
	})
	const uniqueArray = Object.values(uniqueAuthors)
	return arrayMax(uniqueArray)
}

const mostLikes = blogs => {
	const uniqueAuthors = {}
	blogs.forEach(blog => {
		if (blog.author in uniqueAuthors) {
			uniqueAuthors[blog.author] += blog.likes
		} else {
			uniqueAuthors[blog.author] = blog.likes
		}
	})
	const uniqueArray = Object.values(uniqueAuthors)
	return arrayMax(uniqueArray)
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }