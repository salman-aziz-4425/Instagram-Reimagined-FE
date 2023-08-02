import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { message } from 'antd'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import back from '../../assets/back.png'
import CommentCard from './CommentCard'
import {
	addCommentAPI,
	deleteCommentAPI,
	updateCommentAPI,
	getCommentAPI
} from '../../services/comment'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	border: 'none',
	bgcolor: 'background.paper',
	boxShadow: 24,
	pb: 7
}

export default function CommentShare(props) {
	const [comments, setcomments] = useState([])
	const [description, setDescription] = useState('')
	const [images, setImages] = useState([])
	const [messageApi, contextHolder] = message.useMessage()
	const Activeuser = useSelector((state) => state)

	useEffect(() => {
		const fetchdata = async () => {
			const response = await getCommentAPI(props?.postId)
			setcomments(response.data?.comments)
			setImages(response.data?.postImages)
		}
		fetchdata()
	}, [props])

	const onCommentAdd = async (e) => {
		e.preventDefault()
		try {
			if (description.length === 0) {
				alert('Fields are empty')
				return
			}

			await addCommentAPI(Activeuser._id, props.postId, description)
			const newComment = {
				_id: props.postId,
				userId: {
					profilePictureUrl: Activeuser.profilePic,
					username: Activeuser.username
				},
				description: description
			}
			setcomments([newComment, ...comments])

			messageApi.open({
				type: 'success',
				content: 'Comments added'
			})

			const postIndex = props.followingPost.findIndex(
				(p) => p._id === props.postId
			)
			const post = props.followingPost?.find(
				(post) => post._id === props.postId
			)
			const updatedPost = { ...post, comment: [...post.comment, newComment] }
			const updatedFollowingPost = [
				...props.followingPost.slice(0, postIndex),
				updatedPost,
				...props.followingPost.slice(postIndex + 1)
			]

			props.setfollowingPost(updatedFollowingPost)
		} catch {
			messageApi.open({
				type: 'error',
				content: 'Comments not added'
			})
		}
	}

	const onCommentDelete = async (id) => {
		try {
			await deleteCommentAPI(id)
			setcomments(comments.filter((comment) => comment._id !== id))
			const updatedFollowingPost = props.followingPost.map((post) => {
				if (post._id === props.postId) {
					const updatedComments = post.comment.filter(
						(commentId) => commentId !== id
					)
					return { ...post, comment: updatedComments }
				}
				return post
			})
			props.setfollowingPost(updatedFollowingPost)
			messageApi.open({
				type: 'success',
				content: 'Comments deleted'
			})
		} catch (error) {
			console.log(error)
			messageApi.open({
				type: 'error',
				content: 'Comments failed to delete'
			})
		}
	}
	const onCommentUpdate = async (id) => {
		if (description.length === 0) {
			alert('Fields are empty')
			return
		}
		try {
			await updateCommentAPI(id, description)
			setcomments((prevComments) =>
				prevComments.map((comment) =>
					comment._id === id
						? { ...comment, description: description }
						: comment
				)
			)
			messageApi.open({
				type: 'success',
				content: 'Comments Updated'
			})
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Comments Not updated'
			})
		}
	}
	return (
		<React.Fragment>
			{contextHolder}
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						...style,
						width: 1000,
						height: 800,
						border: 'none',
						overflow: 'hidden'
					}}
				>
					<div className="flex border-y px-2 justify-between items-center py-1 border-y-gray-300">
						<Button onClick={props.handleClose}>
							<img className="w-8 h-8 object-contain" src={back} />
						</Button>

						<p className="font-bold">Add Comment</p>
						<Button onClick={onCommentAdd}>
							<h1 className="text-blue-500 font-bold">Share</h1>
						</Button>
					</div>
					<div className="flex h-full">
						<div className="flex-1 border-r border-r-black">
							<div className="flex h-full w-full overflow-x-auto transition ease-in-out duration-300">
								{images.length !== 0 &&
									images.map((image, index) => (
										<img
											className="w-full h-full object-contain"
											key={index}
											src={image}
										/>
									))}
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center pt-6">
							<div className="flex relative">
								<TextField
									id="paragraph-input"
									label="Enter your Comment"
									multiline
									rows={10}
									variant="outlined"
									fullWidth
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-500 to-red-600 mt-20 border-y border-gray-500 w-full text-center py-4">
								Comments
							</h1>
							<div className="flex flex-col w-full h-full overflow-y-auto">
								{comments.map((comment) => (
									<CommentCard
										key={comment._id}
										_id={comment._id}
										Activeuserposts={Activeuser.posts}
										postId={props.postId}
										username={comment.userId.username}
										profile={comment.userId?.profilePictureUrl}
										description={comment.description}
										loc={props.loc}
										deleteCommentHandler={onCommentDelete}
										updateCommentHandler={onCommentUpdate}
									/>
								))}
							</div>
						</div>
					</div>
				</Box>
			</Modal>
		</React.Fragment>
	)
}
