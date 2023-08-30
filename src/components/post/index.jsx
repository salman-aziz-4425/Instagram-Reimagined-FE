import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import Postmanagemodal from './Postmanagemodal'
import Post from './PostCardProfile'
import { deleteUserPost } from '../../redux/postSlice'
import PostShare from './PostShare'
import CommentShare from '../comment/CommentShare'
import {
	useDeletePostMutation,
	useFetchPostStatsQuery,
	useLikePostMutation
} from '../../services/postsApi'

export default function Posthandler(props) {
	const [open, setOpen] = useState(false)
	const [updateModal, setupdateModal] = useState(false)
	const [commentModal, setcommentModal] = useState(false)
	const [commentCount, setcommentCount] = useState(0)
	const [followingPost, setfollowingPost] = useState([])
	const [postId, setPostId] = useState(0)
	const [privatePost, setprivatePost] = useState(false)

	const dispatch = useDispatch()
	const Activeuser = useSelector((state) => state.user)
	const Activeuserposts = useSelector((state) => state)

	const [Notification, contextHolder] = message.useMessage()
	const [deletePost] = useDeletePostMutation()
	const [likePost] = useLikePostMutation()

	const SearchUser = props.SearchusersData
	const user = props.path === '/profile' ? Activeuser : SearchUser
	const posts =
		props.path === '/profile' ? Activeuserposts.posts : SearchUser.posts

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const updateModalOpen = () => setupdateModal(true)
	const updateModalClose = () => setupdateModal(false)

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)

	const config = useMemo(() => {
		return {
			headers: { Authorization: `Bearer ${Activeuser.token}` }
		}
	}, [Activeuser.token])

	const { data, isLoading, refetch } = useFetchPostStatsQuery({
		userId: user._id,
		headers: config
	})

	useEffect(() => {
		async function fetchData() {
			if (!isLoading) {
				setfollowingPost(data)
			}
		}
		fetchData()
	}, [user._id, posts, props.path, config, isLoading, data])

	const onPostDelete = async (postId) => {
		try {
			await deletePost({ postId: postId, headers: config })
			dispatch(deleteUserPost(postId))
			Notification.open({
				type: 'success',
				content: 'Post deleted'
			})
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
		}
	}
	const onPostLike = async (id, likestatus) => {
		try {
			await likePost({ postId: id, userId: Activeuser._id, headers: config })

			if (likestatus) {
				Notification.open({
					type: 'success',
					content: 'post disliked'
				})
			} else {
				Notification.open({
					type: 'success',
					content: 'post liked'
				})
			}
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
		}
	}
	return (
		<div className="flex flex-col justify-center items-center">
			{contextHolder}
			<div className="flex flex-col items-center w-1/2">
				{posts.length > 0 &&
					posts.map(
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
									LogedInuser={Activeuser._id}
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
				config={config}
			/>

			{updateModal === true && (
				<PostShare
					handleClose={updateModalClose}
					handleOpen={updateModalOpen}
					open={updateModal}
					status="UpdateModal"
					postId={postId}
					postImages={posts[postId]}
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
					refetch={refetch}
				/>
			)}
		</div>
	)
}
