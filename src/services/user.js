/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const loginUserAPI = async (phoneNumber, password) => {
	try {
		const userInfo = await axios.get(
			`${API_BASE_URL}/user/login?phoneNumber=${phoneNumber}&password=${password}`
		)
		return userInfo
	} catch (error) {
		throw error
	}
}

export const registerUserAPI = async (user) => {
	try {
		await axios.post('http://localhost:3000/user/register', user)
	} catch (error) {
		throw error
	}
}

export const updateUserPicAPI = async (userId, imageFile, headers) => {
	try {
		const formData = new FormData()
		formData.append('userId', userId)
		formData.append('image', imageFile)
		const response = await axios.put(
			`${API_BASE_URL}/user/update`,
			formData,
			headers
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const followRequestAPI = async (
	senderId,
	receiverId,
	status,
	headers
) => {
	try {
		await axios.post(
			`${API_BASE_URL}/follow/request`,
			{
				senderId,
				receiverId,
				status
			},
			headers
		)
	} catch (error) {
		throw error
	}
}

export const acceptRequestAPI = async (
	loggedInUserId,
	requestedUserId,
	status,
	headers
) => {
	try {
		await axios.put(
			`${API_BASE_URL}/follow/acceptrequest`,
			{
				LogedInUserId: loggedInUserId,
				requestedUserID: requestedUserId,
				status
			},
			headers
		)
	} catch (error) {
		throw error
	}
}

export const rejectRequestAPI = async (
	loggedInUserId,
	requestedUserId,
	headers
) => {
	try {
		await axios.put(
			`${API_BASE_URL}/follow/rejectrequest`,
			{
				LogedInUserId: loggedInUserId,
				requestedUserID: requestedUserId
			},
			headers
		)
	} catch (error) {
		throw error
	}
}

export const updateVisibilityAPI = async (userId, visibility, headers) => {
	try {
		await axios.put(
			`${API_BASE_URL}/user/updatevisibility`,
			{
				userId,
				visibility
			},
			headers
		)
	} catch (error) {
		throw error
	}
}

export const searchUserAPI = async (searchUser, headers) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/user/search?searchTerm=${searchUser}`,
			headers
		)
		return response
	} catch (error) {
		throw error
	}
}
