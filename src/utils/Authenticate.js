export const Authenticate = (user) => {
	console.log(user)
	const PhoneNumber = /^[0-9]{10}$/
	const username = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/

	const error = {
		PhoneNumber: false,
		fullName: false,
		Username: false,
		Password: false
	}
	if (!PhoneNumber.test(parseInt(user.PhoneNumber))) {
		error.PhoneNumber = true
	} else if (user.PhoneNumber.length !== 11) {
		error.PhoneNumber = true
	}

	if (!username.test(user.Username)) {
		error.Username = true
	}
	if (user.Password.length < 8) {
		error.Password = 'password is too short'
	}
	return error
}
