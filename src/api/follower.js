/* eslint-disable no-useless-catch */
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const getFollowersPostAPI = async (id) => {
	const response = await axios.get(`${API_BASE_URL}/getfollowingPost?_id=${id}`)
	return response
}

export const getFollowersStoryAPI = async (id) => {
	const response = await axios.get(
		`${API_BASE_URL}/getfollowingStories?_id=${id}`
	)
	return response
}
