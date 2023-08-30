import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'

import SideBar from '../components/index'
import Post from '../components/post/PostCardHome'
import CommentShare from '../components/comment/CommentShare'
import StoryCard from '../components/story'
import PageLoading from '../components/utils/PageLoading'
import { cloudinaryAssets } from '../utils/constants'
import {
	useFetchPostStatsQuery,
	useGetFollowersPostQuery,
	useLikePostMutation
} from '../services/postsApi'
import { useGetFollowersStoryQuery } from '../services/storiesApi'

export default function Home() {
	const [followingPost, setfollowingPost] = useState([])
	const [followingStories, setfollowingStories] = useState([])
	const [commentModal, setcommentModal] = useState(false)
	const [postId, setPostId] = useState(0)
	const user = useSelector((state) => state.user)
	const [likePost] = useLikePostMutation()

	const config = useMemo(() => {
		return {
			headers: { Authorization: `Bearer ${user.token}` }
		}
	}, [user.token])

	const { data, isLoading } = useGetFollowersPostQuery({
		userId: user._id,
		headers: config
	})
	const stories = useGetFollowersStoryQuery({ id: user._id, headers: config })
	const { refetch } = useFetchPostStatsQuery({
		userId: user._id,
		headers: config
	})

	const [Notification, contextHolder] = message.useMessage()

	useEffect(() => {
		async function fetchData() {
			if (!isLoading) {
				setfollowingPost(data)
			}
			if (!stories.isLoading) {
				setfollowingStories(stories.data)
			}
		}
		fetchData()
	}, [data, isLoading, stories.data, stories.isLoading])

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)

	const likehandler = async (id, likestatus) => {
		try {
			await likePost({ postId: id, userId: user._id, headers: config })
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
		} catch {
			Notification.open({
				type: 'error',
				content: 'Post failed to like'
			})
		}
	}

	return (
		<>
			{contextHolder}
			<div className="flex justify-between text-black px-2 ">
				<SideBar />
				<div className="flex flex-col w-[80%]">
					<div className="flex my-[7%] text-black text-center ml-40 space-x-8">
						{followingStories &&
							followingStories.map((story, index) => {
								const sortedData = story.expiryData.sort(
									(a, b) => Date.parse(b) - Date.parse(a)
								)
								return (
									Date.parse(sortedData[0]) > Date.now() && (
										<StoryCard
											key={story._id}
											storyid={story._id}
											authorid={story.userId._id}
											loginuserid={user._id}
											username={story.userId.username}
											userDefaultPic={
												story.userId.profilePictureUrl ||
												cloudinaryAssets.DefaultProfileIcon
											}
											descriptions={story.descriptions}
											imageUrls={story.imageUrls}
											expiryDates={story.expiryData}
											storyPosition={index}
											config={config}
										/>
									)
								)
							})}
					</div>
					{isLoading ? (
						<PageLoading />
					) : (
						<div className="flex-1 flex flex-col ml-80 w-[50%]">
							{followingPost&&followingPost.length > 0 ? (
								followingPost.map(
									(post) =>
										(post.privateStatus === false ||
											(post.privateStatus === true &&
												post.userId.followers.findIndex(
													(follower) =>
														follower.user === user._id &&
														follower.status === 'accepted'
												) !== -1) ||
											post.userId._id === user._id) && (
											<Post
												key={post._id}
												id={post._id}
												profilePic={post?.userId?.profilePictureUrl}
												username={post?.userId.username}
												imageUrl={post?.imageUrls}
												description={post?.description}
												comment={post?.comment}
												likes={post.likes}
												loc="/Home"
												LogedInuser={user._id}
												setPostId={setPostId}
												setcommentModal={setcommentModal}
												likehandler={likehandler}
												setfollowingPost={setfollowingPost}
												followingPost={followingPost}
											/>
										)
								)
							) : (
								<h1 className="font-extrabold text-transparent text-8xl border-y border-gray-500xl bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 mt-20  w-full text-center py-4">
									No Post Yet
								</h1>
							)}
						</div>
					)}

					{commentModal === true && (
						<CommentShare
							handleClose={commentModalClose}
							handleOpen={commentModalOpen}
							open={commentModal}
							postId={postId}
							setfollowingPost={setfollowingPost}
							followingPost={followingPost}
							loc="/Home"
							refetch={refetch}
						/>
					)}
				</div>
			</div>
		</>
	)
}
