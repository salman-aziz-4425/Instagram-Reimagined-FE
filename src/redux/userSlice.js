import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	_id: '',
	phoneNumber: 0,
	fullName: '',
	username: '',
	password: '',
	isAuth: false,
	token: '',
	profilePic: '',
	visibility: false,
	followers: [],
	following: [],
	stories: []
}
export const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		addUserInfo: (state, action) => {
			state._id = action.payload?.user._id
			state.phoneNumber = action.payload?.user.phoneNumber
			state.username = action.payload?.user.username
			state.token = action.payload.token
			state.profilePic = action.payload.user.profilePictureUrl
			state.isAuth = action.payload.isAuth
			state.visibility = action.payload.user.visibility
			state.followers = action.payload.user.followers
			state.following = action.payload.user.following
		},
		addUserStories: (state, action) => {
			const story = state.stories
			story.push(action.payload)
			state.stories = story
		},
		addFollowingRequest: (state, action) => {
			state.following.push(action.payload)
		},
		deleteUserPost: (state, action) => {
			let posts = state.posts
			posts = posts.filter((post) => {
				return post._id !== action.payload
			})
			state.posts = posts
		},
		updateUserPicture: (state, action) => {
			state.profilePic = action.payload.imageUrl
		},
		updatestatusUser: (state, action) => {
			state.visibility = action.payload
		},
		acceptFollowerRequest: (state, action) => {
			const index = state.followers.findIndex(
				(followingUser) => followingUser.user === action.payload.user
			)
			if (index !== -1) {
				state.followers[index].status = action.payload.status
			}
		}
	}
})

export const {
	addUserInfo,
	addUserStories,
	updateUserPicture,
	updatestatusUser,
	addFollowingRequest,
	acceptFollowerRequest
} = userSlice.actions

export default userSlice.reducer
