// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Post from './PostCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Postmanagemodal from './Postmanagemodal'
import { deleteUserPost } from '../../features/userSlice'
import PostShare from './PostShare'

export default function Posthandler(props) {
	const [open, setOpen] = React.useState(false)
	const [updateModal, setupdateModal] = React.useState(false)
	const [postId, setPostId] = React.useState(0)
	const dispatch = useDispatch()
	const user = props.usersData

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const updateModalOpen = () => setupdateModal(true)
	const updateModalClose = () => setupdateModal(false)

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
					user.posts.map((post) => (
						<Post
							key={post._id}
							id={post._id}
							profilePic={post?.userId?.profilePictureUrl}
							username={post?.userId.username}
							imageUrl={post?.imageUrls}
							description={post?.description}
							handleOpen={handleOpen}
							setPostId={setPostId}
						/>
					))}
			</div>
			<Postmanagemodal
				handleClose={handleClose}
				handleOpen={handleOpen}
				open={open}
				postId={postId}
				deletePost={PostDeleteHandler}
				handleUpdateModal={updateModalOpen}
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
		</div>
	)
}
