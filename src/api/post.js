/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const deletePostAPI = async (postId) => {
	try {
		await axios.delete(`${API_BASE_URL}/deletePost?postId=${postId}`)
	} catch (error) {
		throw error
	}
}

export const likePostAPI = async (postId, userId) => {
	try {
		await axios.post(`${API_BASE_URL}/likePost`, {
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
			`${API_BASE_URL}/specificPostData?userId=${userId}`
		)
		return response
	} catch (error) {
		throw error
	}
}

export const addPostAPI = async (id, description, imageFiles) => {
	try {
		const formData = new FormData()
		formData.append('userId', id)
		formData.append('description', description)

		for (let i = 0; i < imageFiles.length; i++) {
			formData.append('images', imageFiles[i])
		}
		const response = await axios.post(`${API_BASE_URL}/addPost`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
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
			`${API_BASE_URL}/updatePost`,
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
