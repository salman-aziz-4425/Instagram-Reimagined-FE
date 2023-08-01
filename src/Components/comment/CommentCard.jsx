// eslint-disable-next-line no-unused-vars
import React from 'react'
import userDefaultPic from '../../assets/user.png'
function CommentCard(props) {
	return (
		<div className="flex flex-col items-start px-2 border-b border-gray-400">
			<div className="flex w-full h-20 items-center">
				<img
					className="w-16 rounded-full"
					src={props.profile || userDefaultPic}
					alt="Profile"
				/>
				<p className="ml-4">{props.username}</p>
			</div>
			<h1 className="ml-4 mb-4">{props.description}</h1>
			{(props.loc === '/profile' ||
				props.Activeuserposts.findIndex((post) => props.postId === post._id) !==
					-1) && (
				<div className="flex  ml-80  items-center space-x-2 mb-2">
					<button
						className="bg-blue-500 text-white px-2 py-1 rounded"
						onClick={() => props.updateCommentHandler(props._id)}
					>
						Edit
					</button>
					<button
						className="bg-red-500 text-white px-2 py-1 rounded"
						onClick={() => props.deleteCommentHandler(props._id)}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}

export default CommentCard
