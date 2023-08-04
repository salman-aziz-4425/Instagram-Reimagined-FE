/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const storyAddAPI = async (id, description, imageFiles) => {
	const formData = new FormData()
	formData.append('userId', id)
	formData.append('description', description)
	formData.append('image', imageFiles)
	try {
		const response = await axios.post(`${API_BASE_URL}/story/add`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response
	} catch (error) {
		throw error
	}
}

export const storydeleteAPI = async (storyId, index, userId) => {
	try {
		await axios.delete(
			`http://localhost:3000/story/delete?storyId=${storyId}&index=${index}&userId=${userId}`
		)
	} catch (error) {
		throw error
	}
}
