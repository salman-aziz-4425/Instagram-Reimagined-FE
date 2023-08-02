/* eslint-disable no-useless-catch */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const addCommentAPI = async (userId, postId, description) => {
	try {
		await axios.post(`${API_BASE_URL}/comment/add`, {
			userId: userId,
			postId: postId,
			description: description
		})
	} catch (error) {
		throw error
	}
}

export const deleteCommentAPI = async (commentId) => {
	try {
		await axios.delete(`${API_BASE_URL}/comment/delete?commentId=${commentId}`)
	} catch (error) {
		throw error
	}
}

export const updateCommentAPI = async (commentId, description) => {
	try {
		await axios.put(`${API_BASE_URL}/comment/update`, {
			commentId: commentId,
			description: description
		})
	} catch (error) {
		throw error
	}
}

export const getCommentAPI = async (postId) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/comment/get?postId=${postId}`
		)
		return response
	} catch (err) {
		throw err
	}
}
