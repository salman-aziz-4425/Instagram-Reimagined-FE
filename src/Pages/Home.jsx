// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SideBar from '../Components/SideBar'
import Post from '../Components/post/PostCard'

export default function Home() {
	const [followingPost, setfollowingPost] = useState([])
	const user = useSelector((state) => state.persistedReducer)
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				'http://localhost:3000/getfollowingPost?_id=' + user._id
			)
			setfollowingPost(response.data)
		}
		fetchData()
	}, [user])

	return (
		<div className="flex justify-between text-black px-2 ">
			<SideBar />
			<div className=" flex flex-col w-[80%]">
				<div className="my-[7%] text-black text-center ml-60]">
					<h1>stories</h1>
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
									/>
								)
						)
					) : (
						<h1 className="font-extrabold text-transparent text-8xl border-y border-gray-500xl bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 mt-20  w-full text-center py-4">
							No Post Yet
						</h1>
					)}
					:
				</div>
			</div>
		</div>
	)
}
