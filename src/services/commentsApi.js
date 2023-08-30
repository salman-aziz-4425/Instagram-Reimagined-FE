import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentsApi = createApi({
	reducerPath: 'comments',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	endpoints: (builder) => ({
		addComment: builder.mutation({
			query: ({ userId, postId, description, headers }) => {
				return {
					url: '/comments',
					method: 'POST',
					body: {
						userId,
						postId,
						description
					},
					headers: headers.headers
				}
			},
			invalidatesTags: ({ authorId }) => [
				{ type: 'UserComments', id: authorId }
			]
		}),
		deleteComment: builder.mutation({
			query: ({ commentId, headers }) => {
				return {
					url: '/comments',
					method: 'DELETE',
					params: {
						commentId
					},
					headers: headers.headers
				}
			},
			invalidatesTags: ({ authorId }) => [
				{ type: 'UserComments', id: authorId }
			]
		}),
		updateComment: builder.mutation({
			query: ({ commentId, description, headers }) => {
				return {
					url: '/comments',
					method: 'PUT',
					body: {
						commentId,
						description
					},
					headers: headers.headers
				}
			},
			invalidatesTags: ({ authorId }) => [
				{ type: 'UserComments', id: authorId }
			]
		}),
		getComment: builder.query({
			query: ({ postId, headers }) => {
				return {
					url: '/comments',
					params: {
						postId
					},
					headers: headers.headers
				}
			},
			providesTags: ({ authorId }) => [{ type: 'UserComments', id: authorId }]
		})
	})
})

export const {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
	useGetCommentQuery
} = commentsApi
