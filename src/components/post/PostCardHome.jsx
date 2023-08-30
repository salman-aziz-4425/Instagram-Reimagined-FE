import { useState, useMemo } from 'react'
import { cloudinaryAssets } from '../../utils/constants'

export default function HomePostCard(props) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const likeData = useMemo(() => {
		const post = props?.followingPost.find((post) => post._id === props.id)
		const likes = post ? post?.likes : []
		const like = likes?.includes(props?.LogedInuser)
		return { like, likeLength: likes.length }
	}, [props.followingPost, props?.id, props.LogedInuser])

	const like = likeData.like
	const likeLength = likeData.likeLength

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
		<div className="overflow-hidden border rounded-lg shadow-md my-4">
			<div className="w-full flex justify-between p-3">
				<div className="flex">
					<div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-auto">
						<img
							className="h-full w-full object-cover"
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
			<div className="flex w-full h-[500px] overflow-auto relative">
				<button
					className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
					onClick={previousImage}
					disabled={currentImageIndex === 0}
				>
					&lt;
				</button>
				<button
					className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
					onClick={nextImage}
					disabled={currentImageIndex === props.imageUrl.length - 1}
				>
					&gt;
				</button>
				<img
					key={currentImageIndex}
					className="w-full h-full object-contain"
					src={props.imageUrl[currentImageIndex]}
					alt=""
				/>
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
						props?.likehandler(props?.id, like)
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
						<img className="w-6 h-6" src={cloudinaryAssets.EmptyLike} alt="" />
					) : (
						<img className="w-6 h-6" src={cloudinaryAssets.FilledLike} alt="" />
					)}
				</div>
				<div className="pt-1">
					<div className="mb-2 text-sm">
						<span className="font-medium mr-2">{props?.username}</span>
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
