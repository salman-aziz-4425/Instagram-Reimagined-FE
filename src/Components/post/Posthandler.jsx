// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Postmanagemodal from './Postmanagemodal'
import Post from './PostCard'
import { deleteUserPost } from '../../features/userSlice'
import PostShare from './PostShare'
import CommentShare from '../comment/CommentShare'

export default function Posthandler(props) {
	const [open, setOpen] = useState(false)
	const [updateModal, setupdateModal] = useState(false)
	const [commentModal, setcommentModal] = useState(false)
	const [postId, setPostId] = useState(0)
	const [privatePost, setprivatePost] = useState(false)
	const dispatch = useDispatch()
	const user = props.SearchusersData

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const updateModalOpen = () => setupdateModal(true)
	const updateModalClose = () => setupdateModal(false)

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)

	const PostDeleteHandler = async (postId) => {
		try {
			await axios.delete(`http://localhost:3000/deletePost?postId=${postId}`)
			dispatch(deleteUserPost(postId))
			alert('post deleted')
		} catch {
			alert('Something went wrong')
		}
	}
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-col items-center w-1/2">
				{user.posts.length > 0 &&
					user.posts.map(
						(post) =>
							(post.privateStatus === false ||
								(post.privateStatus === true &&
									user.followers.findIndex(
										(follower) =>
											follower.user === props.loginUserid &&
											follower.status === 'accepted'
									) !== -1) ||
								user._id === props.loginUserid) && (
								<Post
									key={post._id}
									id={post._id}
									profilePic={
										props.path === '/profile'
											? user?.profilePic
											: user?.profilePictureUrl
									}
									username={user.username}
									imageUrl={post?.imageUrls}
									description={post?.description}
									handleOpen={handleOpen}
									comment={post?.comment}
									privateStatus={post?.privateStatus}
									setprivatePost={setprivatePost}
									setPostId={setPostId}
									setcommentModal={setcommentModal}
								/>
							)
					)}
			</div>
			<Postmanagemodal
				handleClose={handleClose}
				handleOpen={handleOpen}
				open={open}
				postId={postId}
				deletePost={PostDeleteHandler}
				handleUpdateModal={updateModalOpen}
				privateStatus={privatePost}
				setprivatePost={setprivatePost}
			/>
			{updateModal === true && (
				<PostShare
					handleClose={updateModalClose}
					handleOpen={updateModalOpen}
					open={updateModal}
					status="UpdateModal"
					postId={postId}
					postImages={user.posts[postId]}
				/>
			)}
			{commentModal === true && (
				<CommentShare
					handleClose={commentModalClose}
					handleOpen={commentModalOpen}
					open={commentModal}
					postId={postId}
					postImages={user.posts[postId]}
				/>
			)}
		</div>
	)
}
