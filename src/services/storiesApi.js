import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const storiesApi = createApi({
	reducerPath: 'stories',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	endpoints: (builder) => ({
		addStory: builder.mutation({
			query: ({ id, description, imageFiles, headers }) => {
				const formData = new FormData()
				formData.append('userId', id)
				formData.append('description', description)
				formData.append('images', imageFiles)
				return {
					url: '/stories',
					method: 'POST',
					body: formData,
					headers: headers.headers
				}
			},
			invalidatesTags: ['Stories']
		}),
		deleteStory: builder.mutation({
			query: ({ storyId, index, userId, headers }) => {
				return {
					url: '/stories',
					method: 'DELETE',
					params: {
						storyId,
						index,
						userId
					},
					headers: headers.headers
				}
			},
			invalidatesTags: ['Stories']
		}),
		getFollowersStory: builder.query({
			query: ({ id, headers }) => ({
				url: `/followers/v2/${id}`,
				method: 'GET',
				headers: headers.headers
			}),
			providesTags: ['Stories']
		})
	})
})

export const {
	useAddStoryMutation,
	useDeleteStoryMutation,
	useGetFollowersStoryQuery
} = storiesApi
