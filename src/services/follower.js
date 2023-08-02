/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const getFollowersPostAPI = async (id, headers) => {
	const response = await axios.get(
		`${API_BASE_URL}/follow/followingpost?_id=${id}`,
		headers
	)
	return response
}

export const getFollowersStoryAPI = async (id, headers) => {
	const response = await axios.get(
		`${API_BASE_URL}/follow/followingstories?_id=${id}`,
		headers
	)
	return response
}
