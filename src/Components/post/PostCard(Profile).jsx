// eslint-disable-next-line no-unused-vars
import React from 'react'
import emptyLike from '../../assets/emptyLike.png'
import filledLike from '../../assets/filledLike.png'
import userDefaultPic from '../../assets/user.png'
export default function Post(props) {
	const {
		LogedInuser,
		followingPost,
		username,
		description,
		id,
		imageUrl,
		likehandler
	} = props
	const post = followingPost?.find((post) => post._id === id)
	const like = post?.likes?.includes(LogedInuser)
	const likeLength = post?.likes?.length || 0

	return (
		<div className="rounded overflow-hidden border w-full align-middle my-4">
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
				{imageUrl.map((url, index) => (
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
						likehandler(id)
						const newLikes = like
							? post?.likes.filter((userid) => userid !== LogedInuser)
							: [...post.likes, LogedInuser]

						const updatedPost = { ...post, likes: newLikes }

						const postIndex = followingPost.findIndex((p) => p._id === id)

						const updatedFollowingPost = [
							...followingPost.slice(0, postIndex),
							updatedPost,
							...followingPost.slice(postIndex + 1)
						]

						props.setfollowingPost(updatedFollowingPost)
					}}
				>
					{like !== true ? (
						<img className="w-6 h-6" src={emptyLike} alt="Not Liked" />
					) : (
						<img className="w-6 h-6" src={filledLike} alt="Liked" />
					)}
				</div>

				<div className="pt-1">
					<div className="mb-2 text-sm">
						<span className="font-medium mr-2">{username}</span> {description}
					</div>
				</div>
				<div
					className="text-sm mb-2 text-gray-400 cursor-pointer font-medium"
					onClick={() => {
						props.setPostId(id)
						props.setcommentModal(true)
					}}
				>
					View all {post?.comment?.length} comments
				</div>
			</div>
		</div>
	)
}
