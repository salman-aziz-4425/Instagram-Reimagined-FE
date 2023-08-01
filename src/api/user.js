/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const loginUserAPI = async (phoneNumber, password) => {
	try {
		const userInfo = await axios.get(
			`${API_BASE_URL}/loginUser?phoneNumber=${phoneNumber}&password=${password}`
		)
		return userInfo
	} catch (error) {
		throw error
	}
}

export const registerUserAPI = async (user) => {
	try {
		await axios.post('http://localhost:3000/registerUser', user)
	} catch (error) {
		throw error
	}
}

export const updateUserPicAPI = async (userId, imageFile) => {
	try {
		const formData = new FormData()
		formData.append('userId', userId)
		formData.append('image', imageFile)
		const response = await axios.put(`${API_BASE_URL}/updateProfile`, formData)
		return response.data
	} catch (error) {
		throw error
	}
}

export const followRequestAPI = async (senderId, receiverId, status) => {
	try {
		await axios.post(`${API_BASE_URL}/followRequest`, {
			senderId,
			receiverId,
			status
		})
	} catch (error) {
		throw error
	}
}

export const acceptRequestAPI = async (
	loggedInUserId,
	requestedUserId,
	status
) => {
	try {
		await axios.put(`${API_BASE_URL}/acceptRequest`, {
			LogedInUserId: loggedInUserId,
			requestedUserID: requestedUserId,
			status
		})
	} catch (error) {
		throw error
	}
}

export const rejectRequestAPI = async (loggedInUserId, requestedUserId) => {
	try {
		await axios.put(`${API_BASE_URL}/rejectRequest`, {
			LogedInUserId: loggedInUserId,
			requestedUserID: requestedUserId
		})
	} catch (error) {
		throw error
	}
}

export const updateVisibilityAPI = async (userId, visibility) => {
	try {
		await axios.put(`${API_BASE_URL}/updateVisibility`, {
			userId,
			visibility
		})
	} catch (error) {
		throw error
	}
}

export const searchUserAPI = async (searchUser) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/searchUser?searchTerm=${searchUser}`
		)
		return response
	} catch (error) {
		throw error
	}
}
