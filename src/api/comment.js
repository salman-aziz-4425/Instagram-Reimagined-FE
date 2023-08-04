/* eslint-disable no-useless-catch */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const addCommentAPI = async (userId, postId, description) => {
	try {
		await axios.post(`${API_BASE_URL}/addComments`, {
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
		await axios.delete(`${API_BASE_URL}/deleteComment?commentId=${commentId}`)
	} catch (error) {
		throw error
	}
}

export const updateCommentAPI = async (commentId, description) => {
	try {
		await axios.put(`${API_BASE_URL}/updateComment?commentId=${commentId}`, {
			description: description
		})
	} catch (error) {
		throw error
	}
}

export const getCommentAPI = async (postId) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/getcomments?postId=${postId}`
		)
		return response
	} catch (err) {
		throw err
	}
}
