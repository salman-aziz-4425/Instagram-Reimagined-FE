import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	endpoints: (builder) => ({
		loginUser: builder.query({
			query: (users) => {
				return {
					url: '/users',
					params: {
						phoneNumber: users.phoneNumber,
						password: users.password
					},
					method: 'GET'
				}
			}
		}),
		registerUser: builder.mutation({
			query: (user) => ({
				url: '/users',
				method: 'POST',
				body: user
			})
		}),
		updateUserPic: builder.mutation({
			query: ({ userId, imageFile }, headers) => {
				const formData = new FormData()
				formData.append('userId', userId)
				formData.append('images', imageFile)

				return {
					url: '/users/v1',
					method: 'PUT',
					headers,
					body: formData
				}
			}
		}),
		followRequest: builder.mutation({
			query: ({ senderId, receiverId, status, headers }) => ({
				url: '/followers/requests',
				method: 'POST',
				headers: headers.headers,
				body: {
					senderId,
					receiverId,
					status
				}
			})
		}),
		acceptRequest: builder.mutation({
			query: ({ loggedInUserId, requestedUserId, status, headers }) => ({
				url: '/followers/requests/accept',
				method: 'PUT',
				headers: headers.headers,
				body: {
					loggedInUserId,
					requestedUserId,
					status
				}
			})
		}),
		rejectRequest: builder.mutation({
			query: ({ loggedInUserId, requestedUserId, headers }) => ({
				url: '/followers/requests/reject',
				method: 'PUT',
				headers: headers.headers,
				body: {
					loggedInUserId,
					requestedUserId
				}
			})
		}),
		updateVisibilityUser: builder.mutation({
			query: ({ userId, visibility, headers }) => ({
				url: '/users/v2/visibility',
				method: 'PUT',
				headers: headers.headers,
				body: {
					userId,
					visibility
				}
			})
		}),
		searchUser: builder.query({
			query: ({ searchTerm, headers }) => ({
				url: `/users/${searchTerm}`,
				headers: headers.headers
			})
		})
	})
})

export const {
	useLoginUserQuery,
	useRegisterUserMutation,
	useUpdateUserPicMutation,
	useFollowRequestMutation,
	useAcceptRequestMutation,
	useRejectRequestMutation,
	useUpdateVisibilityUserMutation,
	useSearchUserQuery
} = userApi
