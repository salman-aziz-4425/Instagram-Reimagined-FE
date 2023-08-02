export const authenticate = (user) => {
	const PhoneNumber = /^[0-9]{10}$/
	const username = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/

	const error = {
		phoneNumber: false,
		fullName: false,
		username: false,
		password: false
	}

	if (!PhoneNumber.test(parseInt(user?.phoneNumber))) {
		error.phoneNumber = true
	} else if (user?.phoneNumber.length !== 11) {
		error.phoneNumber = true
	}

	if (!username.test(user?.username)) {
		error.username = true
	}
	if (user.password.length < 8) {
		error.password = 'password is too short'
	}
	return error
}
