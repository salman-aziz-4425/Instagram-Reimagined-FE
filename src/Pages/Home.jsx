// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { message } from 'antd'
import SideBar from '../Components/SideBar'
import Post from '../Components/post/PostCard(Home)'
import CommentShare from '../Components/comment/CommentShare'
import userDefaultPic from '../assets/user.png'
import StoryCard from '../Components/stories/StoryCard'
import { getFollowersPostAPI, getFollowersStoryAPI } from '../api/follower'

export default function Home() {
	const [followingPost, setfollowingPost] = useState([])
	const [followingStories, setfollowingStories] = useState([])
	const [commentModal, setcommentModal] = useState(false)
	const [postId, setPostId] = useState(0)

	const [messageApi, contextHolder] = message.useMessage()

	const user = useSelector((state) => state.persistedReducer)

	useEffect(() => {
		async function fetchData() {
			const response = await getFollowersPostAPI(user._id)
			setfollowingPost(response.data)
			const responseStory = await getFollowersStoryAPI(user._id)
			setfollowingStories(responseStory.data)
		}
		fetchData()
	}, [user])

	const commentModalOpen = () => setcommentModal(true)
	const commentModalClose = () => setcommentModal(false)
	const headers = { Authorization: user.token }

	const likehandler = async (id) => {
		try {
			await axios.post(
				'http://localhost:3000/likePost',
				{
					postId: id,
					userId: user._id
				},
				{ headers }
			)
			messageApi.open({
				type: 'success',
				content: 'Post Liked'
			})
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
						{followingStories.map((story) => (
							<StoryCard
								key={story._id}
								username={story.userId.username}
								userDefaultPic={
									story.userId.profilePictureUrl || userDefaultPic
								}
							/>
						))}
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
