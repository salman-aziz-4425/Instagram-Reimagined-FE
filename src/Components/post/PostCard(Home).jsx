// eslint-disable-next-line no-unused-vars
import React from 'react'
import emptyLike from '../../assets/emptyLike.png'
import filledLike from '../../assets/filledLike.png'
import userDefaultPic from '../../assets/user.png'
export default function HomePostCard(props) {
	const like = props?.followingPost
		.find((post) => post._id === props.id)
		.likes.includes(props.LogedInuser)
	const likeLength = props.followingPost.find((post) => post._id === props.id)
		.likes.length

	return (
		<div className="overflow-hidden border  align-middle my-4">
			<div className="w-full flex justify-between p-3">
				<div className="flex">
					<div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-auto">
						<img
							src={props.profilePic || userDefaultPic}
							alt="profilepic"
						></img>
					</div>
					<span className="pt-1 ml-2 font-bold text-sm">{props.username}</span>
				</div>
				{props.loc === '/profile' && (
					<span
						className="px-2 hover:bg-gray-300 cursor-pointer rounded"
						onClick={() => {
							props.handleOpen(true)
							props.setPostId(props.id)
							props.setprivatePost(props.privateStatus)
						}}
					>
						...
					</span>
				)}
			</div>
			<div className="flex w-full overflow-auto">
				{props.imageUrl.map((url, index) => (
					<img
						key={index}
						className="w-full  bg-cover object-contain"
						src={url}
					></img>
				))}
			</div>
			<div className="px-3 pb-2">
				<div className="pt-2">
					<i className="far fa-heart cursor-pointer"></i>
					<span className="text-sm text-gray-400 font-medium">
						{likeLength} likes
					</span>
				</div>
				<div
					onClick={() => {
						props?.likehandler(props?.id)
						if (like) {
							const newlikes = props?.likes.filter(
								(userid) => userid !== props?.LogedInuser
							)
							props.setfollowingPost((prevPosts) =>
								prevPosts.map((post) =>
									post._id === props.id ? { ...post, likes: newlikes } : post
								)
							)
						} else {
							props.setfollowingPost((prevPosts) =>
								prevPosts.map((post) =>
									post._id === props.id
										? { ...post, likes: [...post.likes, props.LogedInuser] }
										: post
								)
							)
						}
					}}
				>
					{like !== true ? (
						<img className="w-6 h-6" src={emptyLike} />
					) : (
						<img className="w-6 h-6" src={filledLike} />
					)}
				</div>

				<div className="pt-1">
					<div className="mb-2 text-sm">
						<span className="font-medium mr-2">{props?.username}</span>{' '}
						{props.description}
					</div>
				</div>
				<div
					className="text-sm mb-2 text-gray-400 cursor-pointer font-medium"
					onClick={() => {
						props.setPostId(props.id)
						props.setcommentModal(true)
					}}
				>
					View{' '}
					{
						props?.followingPost.find((post) => post._id === props.id).comment
							.length
					}{' '}
					all comments
				</div>
			</div>
		</div>
	)
}
