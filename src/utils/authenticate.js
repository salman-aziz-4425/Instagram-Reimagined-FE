export const authenticate = (user) => {
	const username = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/

	const error = {
		phoneNumber: '',
		fullName: '',
		username: '',
		password: '',
		mail: ''
	}
	const isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
		user.mail
	)

	if (!user?.phoneNumber) {
		error.phoneNumber = 'Phone number is required'
	} else if (user?.phoneNumber.length !== 11) {
		error.phoneNumber = 'Phone number should be 11 digits'
	}

	if (!user?.fullName) {
		error.fullName = 'Full name is required'
	}

	if (!user?.username) {
		error.username = 'Username is required'
	} else if (!username.test(user?.username)) {
		error.username = 'Invalid username format'
	}

	if (!user?.password) {
		error.password = 'Password is required'
	} else if (user.password.length < 8) {
		error.password = 'Password is too short'
	}
	if (!user.mail) {
		error.mail = 'email field is required'
	} else if (!isValid) {
		error.mail = 'email is not valid'
	}

	return error
}
