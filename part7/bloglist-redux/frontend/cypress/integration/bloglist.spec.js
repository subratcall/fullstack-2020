describe('Bloglist', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Thivagar',
			username: 'root',
			password: 'pass'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('login form is shown', function () {
		cy.contains('Please login')
		cy.contains('Username')
		cy.contains('Password')
	})

	describe('login', function () {
		it('succeeds with correct info', function () {
			cy.get('#user').type('root')
			cy.get('#pass').type('pass')
			cy.contains('Login').click()
			cy.contains('Thivagar has logged in.')
		})

		it('fails with incorrect info', function () {
			cy.get('#user').type('hello')
			cy.get('#pass').type('pass')
			cy.contains('Login').click()
			cy.contains('Thivagar has logged in.').should('not.exist')
			cy.get('#notification')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'root', password: 'pass' })
		})

		it('blog can be created', function () {
			cy.contains('New Blog').click()
			cy.get('#title').type('hello blog')
			cy.get('#author').type('Joe')
			cy.get('#url').type('google.ca')
			cy.contains('Add').click()
			cy.contains('hello blog')
		})

		describe('when blog exists', function () {
			beforeEach(function () {
				cy.contains('New Blog').click()
				cy.get('#title').type('hello blog')
				cy.get('#author').type('Joe')
				cy.get('#url').type('google.ca')
				cy.contains('Add').click()
				cy.contains('hello blog')
			})

			it('blog can be liked', function () {
				cy.contains('Show').click()
				cy.contains('Like').click()
				cy.contains('1')
			})

			it('blog can be deleted', function () {
				cy.contains('Show').click()
				cy.contains('Remove').click()
				cy.contains('hello blog').should('not.exist')
			})
		})
	})
})