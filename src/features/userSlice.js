import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	_id: '',
	phoneNumber: 0,
	fullName: '',
	username: '',
	password: '',
	posts: [],
	isAuth: false,
	token: ''
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
			state.isAuth = true
		}
	}
})

export const { addUserInfo } = userSlice.actions

export default userSlice.reducer
