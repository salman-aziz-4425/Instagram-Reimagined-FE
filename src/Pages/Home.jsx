// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import SideBar from '../Components/SideBar'
import Post from '../Components/post/PostCard(Home)'
import CommentShare from '../Components/comment/CommentShare'
import userDefaultPic from '../assets/user.png'
import StoryCard from '../Components/stories/StoryCard'
import { getFollowersPostAPI, getFollowersStoryAPI } from '../services/follower'
import { likePostAPI } from '../services/post'

export default function Home() {
	const [followingPost, setfollowingPost] = useState([])
	const [followingStories, setfollowingStories] = useState([])
	const [commentModal, setcommentModal] = useState(false)
	const [postId, setPostId] = useState(0)
	const [operation, setOperation] = useState(false)

	const user = useSelector((state) => state)

	const [messageApi, contextHolder] = message.useMessage()
	const config = {
		headers: { Authorization: `Bearer ${user.token}` }
	}

	useEffect(() => {
		async function fetchData() {
			const response = await getFollowersPostAPI(user._id, config)
			if (response) {
				setfollowingPost(response.data)
			}
			const responseStory = await getFollowersStoryAPI(user._id, config)
			if (responseStory) {
				setfollowingStories(responseStory.data)
			}
		}
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.posts, operation])

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)

	const likehandler = async (id, likestatus) => {
		try {
			await likePostAPI(id, user._id)
			if (likestatus) {
				messageApi.open({
					type: 'success',
					content: 'post disliked'
				})
			} else {
				messageApi.open({
					type: 'success',
					content: 'post liked'
				})
			}
		} catch {
			messageApi.open({
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
												story.userId.profilePictureUrl || userDefaultPic
											}
											descriptions={story.descriptions}
											imageUrls={story.imageUrls}
											expiryDates={story.expiryData}
											setOperation={setOperation}
											operation={operation}
											storyPosition={index}
										/>
									)
								)
							})}
					</div>
					<div className="flex-1 flex flex-col ml-80 w-[50%]">
						{followingPost.length > 0 ? (
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
					{commentModal === true && (
						<CommentShare
							handleClose={commentModalClose}
							handleOpen={commentModalOpen}
							open={commentModal}
							postId={postId}
							setfollowingPost={setfollowingPost}
							followingPost={followingPost}
							loc="/Home"
						/>
					)}
				</div>
			</div>
		</>
	)
}
