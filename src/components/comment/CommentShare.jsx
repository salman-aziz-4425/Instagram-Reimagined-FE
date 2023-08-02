import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { message } from 'antd'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import { Button, TextField, Typography } from '@mui/material'

import CommentCard from './CommentCard'
import { cloudinaryAssets, styleComment } from '../../utils/constants'
import {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useGetCommentQuery,
	useUpdateCommentMutation
} from '../../services/commentsApi'

export default function CommentShare(props) {
	const [comments, setcomments] = useState([])
	const [description, setDescription] = useState('')
	const [images, setImages] = useState([])
	const [loader, setloader] = useState(false)
	const [Notification, contextHolder] = message.useMessage()
	const Activeuser = useSelector((state) => state.user)
	const posts = useSelector((state) => state.posts)

	const config = useMemo(() => {
		return {
			headers: { Authorization: `Bearer ${Activeuser.token}` }
		}
	}, [Activeuser.token])

	const { data, isLoading } = useGetCommentQuery({
		postId: props?.postId,
		headers: config
	})
	const [addComment, { isComment }] = useAddCommentMutation()
	const [deleteComment] = useDeleteCommentMutation()
	const [updateComment] = useUpdateCommentMutation()

	useEffect(() => {
		const fetchdata = async () => {
			setloader(true)
			console.log(data)
			if (!isLoading) {
				setcomments(data.comments)
				setImages(data?.postImages)
			}
			setloader(false)
		}
		fetchdata()
	}, [config, data, isLoading, props?.postId])

	const onCommentAdd = async (e) => {
		e.preventDefault()
		setloader(isComment)
		try {
			if (description === '') {
				Notification.open({
					type: 'error',
					content: 'Fields are empty'
				})
				setloader(false)
				return
			}

			const response = await addComment({
				userId: Activeuser._id,
				postId: props.postId,
				description,
				headers: config
			})
			const newComment = {
				_id: response._id,
				userId: {
					profilePictureUrl: Activeuser.profilePic,
					username: Activeuser.username
				},
				description: description
			}
			setcomments([newComment, ...comments])
			const postIndex = props.followingPost.findIndex(
				(p) => p._id === props.postId
			)
			const updatedFollowingPost = [...props.followingPost]
			if (postIndex !== -1) {
				updatedFollowingPost[postIndex] = {
					...updatedFollowingPost[postIndex],
					comment: [newComment, ...updatedFollowingPost[postIndex].comment]
				}
			}
			props.setfollowingPost(updatedFollowingPost)
			Notification.open({
				type: 'success',
				content: 'Comments added'
			})
			props.refetch()
			setloader(isComment)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
			setloader(isComment)
		}
	}

	const onCommentDelete = async (id) => {
		try {
			await deleteComment({ commentId: id, headers: config })
			setcomments(comments.filter((comment) => comment._id !== id))
			const postToUpdate = props.followingPost.find(
				(post) => post._id === props.postId
			)
			if (postToUpdate) {
				const updatedComments = comments.filter((comment) => comment._id !== id)
				const updatedPost = { ...postToUpdate, comment: updatedComments }
				const updatedFollowingPost = props.followingPost.map((post) =>
					post._id === props.postId ? updatedPost : post
				)
				props.setfollowingPost(updatedFollowingPost)
			}
			Notification.open({
				type: 'success',
				content: 'Comments deleted'
			})
			props.refetch()
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
		}
	}

	const onCommentUpdate = async (id) => {
		if (description === '') {
			Notification.open({
				type: 'error',
				content: 'Description field is empty',
				style: {
					zIndex: 1000,
					border: '1 px solid green'
				}
			})
			return
		}
		try {
			await updateComment({ commentId: id, description, headers: config })
			setcomments((prevComments) =>
				prevComments.map((comment) =>
					comment._id === id
						? { ...comment, description: description }
						: comment
				)
			)
			const postIndex = props?.followingPost?.findIndex(
				(p) => p._id === props.postId
			)
			const updatedFollowingPost = [...props.followingPost]
			if (postIndex !== -1) {
				updatedFollowingPost[postIndex] = {
					...updatedFollowingPost[postIndex],
					comment: updatedFollowingPost[postIndex].comment.map((comment) =>
						comment._id === id
							? { ...comment, description: description }
							: comment
					)
				}
			}
			props.setfollowingPost(updatedFollowingPost)
			Notification.open({
				type: 'success',
				content: 'Comments Updated',
				style: {
					zIndex: 1000,
					border: '1 px solid green'
				}
			})
			props.refetch()
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`,
				zIndex: 1000
			})
		}
	}

	return (
		<>
			{contextHolder}
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						...styleComment,
						width: 1000,
						height: 800,
						border: 'none',
						overflow: 'hidden'
					}}
				>
					<Box
						className="flex border-y px-2 justify-between items-center py-1 border-y-gray-300"
						component="div"
					>
						<Button onClick={props.handleClose}>
							<img
								className="w-8 h-8 object-contain"
								src={cloudinaryAssets.BackIcon}
								alt=""
							/>
						</Button>
						<Typography className="font-bold">Add Comment</Typography>
						{loader ? (
							<CircularProgress />
						) : (
							<Button onClick={onCommentAdd}>
								<Typography className="text-blue-500 font-bold">
									Share
								</Typography>
							</Button>
						)}
					</Box>

					<Box className="flex w-full h-full">
						<Box className="flex  overflow-y-scroll transition ease-in-out duration-300">
							<Box className="flex flex-col w-full px-6 py-4 justify-center align-middle shadow-sm space-y-4 overflow-y-auto ">
								{images.map((image, index) => (
									<Box key={index} className="relative group">
										<img
											className="w-full h-64  object-contain rounded-lg"
											src={image}
											alt=""
										/>
									</Box>
								))}
							</Box>
						</Box>
						<Box
							className="flex-1 flex flex-col items-center pt-6"
							component="div"
						>
							<Box className="flex px-4 py-4 relative w-full">
								<TextField
									sx={{ width: '100%' }}
									id="paragraph-input"
									label="Enter your Comment"
									multiline
									rows={10}
									variant="outlined"
									fullWidth
									onChange={(e) => setDescription(e.target.value)}
									className=" border rounded-lg p-2"
								/>
							</Box>
							<Typography className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-500 to-red-600 mt-20 border-y border-gray-500 w-full text-center py-4">
								Comments
							</Typography>
							<Box className="flex flex-col px-4 w-full h-full overflow-y-auto mt-4">
								{!isLoading &&
									comments.map((comment) => (
										<CommentCard
											key={comment._id}
											_id={comment._id}
											Activeuserposts={posts}
											postId={props.postId}
											username={comment.userId.username}
											profile={comment.userId?.profilePictureUrl}
											description={comment.description}
											loc={props.loc}
											deleteCommentHandler={onCommentDelete}
											updateCommentHandler={onCommentUpdate}
										/>
									))}
							</Box>
						</Box>
					</Box>
				</Box>
			</Modal>
		</>
	)
}
