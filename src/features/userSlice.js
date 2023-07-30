import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	_id: '',
	phoneNumber: 0,
	fullName: '',
	username: '',
	password: '',
	posts: [],
	isAuth: false,
	token: '',
	profilePic: '',
	visibility: false,
	followers: [],
	following: []
}

export const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		addUserInfo: (state, action) => {
			console.log(action.payload?.user._id)
			state._id = action.payload?.user._id
			state.phoneNumber = action.payload?.user.phoneNumber
			state.username = action.payload?.user.username
			state.posts = action.payload?.user.posts
			state.token = action.payload.token
			state.profilePic = action.payload.user.profilePictureUrl
			state.isAuth = action.payload.isAuth
			state.visibility = action.payload.user.visibility
			state.followers = action.payload.user.followers
			state.following = action.payload.user.following
		},
		addUsersPost: (state, action) => {
			const posts = state.posts
			posts.push(action.payload)
			state.posts = posts
		},
		deleteUserPost: (state, action) => {
			let posts = state.posts
			posts = posts.filter((post) => {
				return post._id !== action.payload
			})
			state.posts = posts
		},
		addFollowingRequest: (state, action) => {
			state.following.push(action.payload)
		},
		updateUsersPost: (state, action) => {
			const posts = state.posts
			const id = action.payload._id
			const index = posts?.findIndex((post) => post._id === id)
			posts[index].description = action.payload.description
		},
		updateUserPic: (state, action) => {
			state.profilePic = action.payload.imageUrl
			state.posts.forEach((post) => {
				post.userId.profilePictureUrl = action.payload.imageUrl
			})
		},
		updatePostVisibility: (state, action) => {
			const posts = state.posts
			const id = action.payload._id
			const index = posts?.findIndex((post) => post._id === id)
			posts[index].privateStatus = action.payload.visibility
		},
		acceptFollowerRequest: (state, action) => {
			const index = state.followers.findIndex(
				(followingUser) => followingUser.user === action.payload.user
			)
			state.followers[index].status = action.payload.status
		}
	}
})

export const {
	addUserInfo,
	addUsersPost,
	deleteUserPost,
	updateUserPic,
	updateUsersPost,
	updatePostVisibility,
	addFollowingRequest,
	acceptFollowerRequest
} = userSlice.actions

export default userSlice.reducer
