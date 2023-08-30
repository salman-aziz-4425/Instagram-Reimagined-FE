import { useState } from 'react'
import { cloudinaryAssets } from '../../utils/constants'

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
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const post = followingPost?.find((post) => post._id === id)
	const like = post?.likes?.includes(LogedInuser)
	const likeLength = post?.likes?.length || 0

	const nextImage = () => {
		if (currentImageIndex < props.imageUrl.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1)
		}
	}

	const previousImage = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1)
		}
	}

	return (
		<div className="rounded overflow-hidden border w-full align-middle my-4">
			<div className="w-full flex justify-between p-3">
				<div className="flex">
					<div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-auto">
						<img
							className="w-full h-full object-cover"
							src={props.profilePic || cloudinaryAssets.DefaultProfileIcon}
							alt={cloudinaryAssets.DefaultProfileIcon}
						/>
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
			<div className="relative w-full h-[500px] overflow-hidden">
				<button
					className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
					onClick={previousImage}
				>
					&lt;
				</button>
				<button
					className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
					onClick={nextImage}
				>
					&gt;
				</button>
				<img
					key={currentImageIndex}
					className="w-full h-[500px] object-cover"
					src={imageUrl[currentImageIndex]}
					alt=""
				/>
			</div>
			<div className="w-full px-3 pb-2">
				<div className="pt-2">
					<i className="far fa-heart cursor-pointer"></i>
					<span className="text-sm text-gray-400 font-medium">
						{likeLength} likes
					</span>
				</div>
				<div
					onClick={() => {
						likehandler(id, like)
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
						<img
							className="w-6 h-6"
							src={cloudinaryAssets.EmptyLike}
							alt="Not Liked"
						/>
					) : (
						<img
							className="w-6 h-6"
							src={cloudinaryAssets.FilledLike}
							alt="Liked"
						/>
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
