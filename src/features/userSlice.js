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
			return state
		},
		addUserStories: (state, action) => {
			const story = state.stories
			story.push(action.payload)
			state.stories = story
		},
		addFollowingRequest: (state, action) => {
			state.following.push(action.payload)
		},
		addUserComment: (state, action) => {
			const posts = state.posts
			const id = action.payload._id
			const index = posts?.findIndex((post) => post._id === id)
			if (index !== -1) {
				posts[index].comment.push(action.payload)
			}
		},
		deleteUserPost: (state, action) => {
			let posts = state.posts
			posts = posts.filter((post) => {
				return post._id !== action.payload
			})
			state.posts = posts
		},
		deleteUserComment: (state, action) => {
			let posts = state.posts
			console.log(action.payload.postId)
			posts = posts.filter((post) => {
				return post._id !== action.payload.postId
			})
			posts.comment = posts.comment.filter((comment) => {
				return comment._id !== action.payload.commentId
			})
		},
		updateUsersPost: (state, action) => {
			const posts = state.posts
			const id = action.payload._id
			const index = posts?.findIndex((post) => post._id === id)
			if (index !== -1) {
				posts[index].description = action.payload.description
			}
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
			if (index !== -1) {
				posts[index].privateStatus = action.payload.visibility
			}
		},
		updateVisibilityUser: (state, action) => {
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
	addUsersPost,
	addUserStories,
	addUserComment,
	deleteUserPost,
	deleteUserComment,
	updateUserPic,
	updateUsersPost,
	updatePostVisibility,
	updateVisibilityUser,
	addFollowingRequest,
	acceptFollowerRequest
} = userSlice.actions

export default userSlice.reducer
