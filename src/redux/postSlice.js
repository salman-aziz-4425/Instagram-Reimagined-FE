import { createSlice } from '@reduxjs/toolkit'

const initialState = []
export const postSlice = createSlice({
	name: 'Post',
	initialState,
	reducers: {
		addPosts: (state, action) => {
			state = [...state, ...action.payload.user.posts]
			return state
		},
		removePosts: (state, action) => {
			state = action.payload.user.posts
			return state
		},
		addUsersPost: (state, action) => {
			state.push(action.payload)
			return state
		},
		deleteUserPost: (state, action) => {
			state = state.filter((post) => {
				return post._id !== action.payload
			})
			return state
		},
		updateUsersPost: (state, action) => {
			const id = action.payload._id
			const index = state?.findIndex((post) => post._id === id)
			if (index !== -1) {
				state[index].description = action.payload.description
			}
			return state
		},
		updateuserProfile: (state, action) => {
			state.forEach((post) => {
				post.userId.profilePictureUrl = action.payload.imageUrl
			})
			return state
		},
		updatePostVisibility: (state, action) => {
			const id = action.payload._id
			const index = state?.findIndex((post) => post._id === id)
			if (index !== -1) {
				state[index].privateStatus = action.payload.visibility
			}
			return state
		}
	}
})

export const {
	addPosts,
	addUsersPost,
	removePosts,
	deleteUserPost,
	updateUsersPost,
	updatePostVisibility,
	updateuserProfile
} = postSlice.actions

export default postSlice.reducer
