// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import Postmanagemodal from './Postmanagemodal'
import Post from './PostCard(Profile)'
import { deleteUserPost } from '../../features/userSlice'
import PostShare from './PostShare'
import CommentShare from '../comment/CommentShare'
import { deletePostAPI, likePostAPI, fetchPostDataAPI } from '../../api/post'

export default function Posthandler(props) {
	const [open, setOpen] = useState(false)
	const [updateModal, setupdateModal] = useState(false)
	const [commentModal, setcommentModal] = useState(false)
	const [commentCount, setcommentCount] = useState(0)
	const [followingPost, setfollowingPost] = useState([])
	const [postId, setPostId] = useState(0)
	const [privatePost, setprivatePost] = useState(false)

	const dispatch = useDispatch()
	const Activeuser = useSelector((state) => state.persistedReducer)
	const [messageApi, contextHolder] = message.useMessage()

	const SearchUser = props.SearchusersData
	const user = props.loc === '/profile' ? Activeuser : SearchUser

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const updateModalOpen = () => setupdateModal(true)
	const updateModalClose = () => setupdateModal(false)

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)

	useEffect(() => {
		async function fetchData() {
			const responseData = await fetchPostDataAPI(user._id)
			setfollowingPost(responseData.data)
			console.log(responseData.data)
		}
		fetchData()
	}, [user._id, props.path])

	const onPostDelete = async (postId) => {
		try {
			await deletePostAPI(postId)
			dispatch(deleteUserPost(postId))
			messageApi.open({
				type: 'success',
				content: 'Post deleted'
			})
		} catch {
			messageApi.open({
				type: 'error',
				content: 'Post failed deleted'
			})
		}
	}
	const onPostLike = async (id) => {
		try {
			await likePostAPI(id, user._id)
			messageApi.open({
				type: 'success',
				content: 'post liked'
			})
		} catch {
			messageApi.open({
				type: 'error',
				content: 'post failed liked'
			})
		}
	}
	return (
		<div className="flex flex-col justify-center items-center">
			{contextHolder}
			<div className="flex flex-col items-center w-1/2">
				{user.posts.length > 0 &&
					user.posts.map(
						(post) =>
							(post.privateStatus === false ||
								(post.privateStatus === true &&
									user.followers.findIndex(
										(follower) =>
											follower.user === Activeuser._id &&
											follower.status === 'accepted'
									) !== -1) ||
								post.userId?._id === user._id) && (
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
									loc={props.path}
									privateStatus={post?.privateStatus}
									setprivatePost={setprivatePost}
									setPostId={setPostId}
									LogedInuser={user._id}
									setcommentModal={setcommentModal}
									setcommentCount={setcommentCount}
									commentCount={commentCount}
									likehandler={onPostLike}
									setfollowingPost={setfollowingPost}
									followingPost={followingPost}
								/>
							)
					)}
			</div>

			<Postmanagemodal
				handleClose={handleClose}
				handleOpen={handleOpen}
				open={open}
				postId={postId}
				deletePost={onPostDelete}
				onUpdateModal={updateModalOpen}
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
					loc={props.path}
					setcommentCount={setcommentCount}
					setfollowingPost={setfollowingPost}
					followingPost={followingPost}
				/>
			)}
		</div>
	)
}
