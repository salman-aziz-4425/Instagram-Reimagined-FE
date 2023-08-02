/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const deletePostAPI = async (postId) => {
	try {
		await axios.delete(`${API_BASE_URL}/post/delete?postId=${postId}`)
	} catch (error) {
		throw error
	}
}

export const likePostAPI = async (postId, userId) => {
	try {
		await axios.post(`${API_BASE_URL}/post/like`, {
			postId,
			userId
		})
	} catch (error) {
		throw error
	}
}

export const fetchPostDataAPI = async (userId) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/post/specificpost?userId=${userId}`
		)
		return response
	} catch (error) {
		throw error
	}
}

export const addPostAPI = async (id, description, imageFiles, token) => {
	try {
		const formData = new FormData()
		formData.append('userId', id)
		formData.append('description', description)

		for (let i = 0; i < imageFiles.length; i++) {
			formData.append('images', imageFiles[i])
		}
		const response = await axios.post(`${API_BASE_URL}/post/add`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: token
			}
		})
		return response
	} catch (error) {
		throw error
	}
}

export const updatePostAPI = async (id, description) => {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/post/update`,
			{
				postId: id,
				description: description
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		return response
	} catch (error) {
		throw error
	}
}

export const updatePostVisibilityAPI = async (id, status) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/post/updatevisibility`, {
			postId: id,
			visibility: status
		})
		return response
	} catch (error) {
		throw error
	}
}
