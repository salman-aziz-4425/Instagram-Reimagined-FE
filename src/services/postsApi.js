import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const followersandpostsApi = createApi({
	reducerPath: 'followersandpostsApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	endpoints: (builder) => ({
		addPost: builder.mutation({
			query: ({ id, description, imageFiles, token }) => {
				const formData = new FormData()
				formData.append('userId', id)
				formData.append('description', description)
				for (let i = 0; i < imageFiles.length; i++) {
					formData.append('images', imageFiles[i])
				}
				return {
					url: '/posts',
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`
					},
					body: formData
				}
			},
			invalidatesTags: ['FollowersPost']
		}),
		deletePost: builder.mutation({
			query: ({ postId, headers }) => {
				return {
					url: '/posts',
					params: {
						postId: postId
					},
					method: 'DELETE',
					headers: headers.headers
				}
			},
			invalidatesTags: ['FollowersPost']
		}),
		updatePost: builder.mutation({
			query: ({ id, description, headers }) => ({
				url: '/posts/v1',
				method: 'PUT',
				headers: headers.headers,
				body: { postId: id, description }
			}),
			invalidatesTags: ['FollowersPost']
		}),
		likePost: builder.mutation({
			query: ({ postId, userId, headers }) => ({
				url: '/posts/likes',
				method: 'POST',
				headers: headers.headers,
				body: { postId, userId }
			}),
			invalidatesTags: ['FollowersPost']
		}),
		getFollowersPost: builder.query({
			query: ({ userId, headers }) => ({
				url: `/followers/v1/${userId}`,
				method: 'GET',
				headers: headers.headers
			}),
			providesTags: ['FollowersPost']
		}),
		getFollowers: builder.query({
			query: ({ followers, headers }) => ({
				url: '/followers',
				headers: headers.headers,
				params: {
					userFollower: JSON.stringify(followers)
				}
			})
		}),
		updatePostStatus: builder.mutation({
			query: ({ id, status, headers }) => ({
				url: '/posts/v2',
				method: 'PUT',
				headers,
				body: { postId: id, visibility: status }
			}),
			invalidatesTags: ['FollowersPost']
		}),
		fetchPostStats: builder.query({
			query: ({ userId, headers }) => {
				return {
					url: `/posts/${userId}`,
					headers: headers.headers
				}
			}
		})
	})
})

export const {
	useAddPostMutation,
	useDeletePostMutation,
	useUpdatePostMutation,
	useLikePostMutation,
	useGetFollowersPostQuery,
	useGetFollowersQuery,
	useUpdatePostStatusMutation,
	useFetchPostStatsQuery
} = followersandpostsApi
