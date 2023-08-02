import { cloudinaryAssets } from '../../utils/constants'

function CommentCard(props) {
	return (
		<div className="border rounded-lg p-4 bg-white shadow-md my-2">
			<div className="flex items-center mb-2">
				<img
					className="w-12 h-12 object-cover rounded-full mr-4"
					src={props.profile || cloudinaryAssets.DefaultProfileIcon}
					alt="Profile"
				/>
				<p className="text-lg font-semibold">{props.username}</p>
			</div>
			<p className="text-center text-gray-700 mb-4">{props.description}</p>
			{(props.loc === '/profile' ||
				props.Activeuserposts.findIndex((post) => props.postId === post._id) !==
					-1) && (
				<div className="flex justify-end space-x-2">
					<button
						className="bg-blue-500 text-white py-1 px-3 rounded-md font-semibold"
						onClick={() => props.updateCommentHandler(props._id)}
					>
						Edit
					</button>
					<button
						className="bg-red-500 text-white py-1 px-3 rounded-md font-semibold"
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
