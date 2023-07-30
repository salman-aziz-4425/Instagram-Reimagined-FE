// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Post(props) {
	return (
		<div className=" rounded overflow-hidden border w-full align-middle my-4">
			<div className="w-full flex justify-between p-3">
				<div className="flex">
					<div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-auto">
						<img
							src={
								props.profilePic ||
								'https://avatars0.githubusercontent.com/u/38799309?v=4'
							}
							alt="profilepic"
						></img>
					</div>
					<span className="pt-1 ml-2 font-bold text-sm">{props.username}</span>
				</div>
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
			</div>
			<div className="flex w-full overflow-auto">
				{props.imageUrl.map((url, index) => (
					<img
						key={index}
						className="flex-1  bg-cover object-contain"
						src={url}
					></img>
				))}
			</div>
			<div className="px-3 pb-2">
				<div className="pt-2">
					<i className="far fa-heart cursor-pointer"></i>
					<span className="text-sm text-gray-400 font-medium">12 likes</span>
				</div>
				<div className="pt-1">
					<div className="mb-2 text-sm">
						<span className="font-medium mr-2">{props.username}</span>{' '}
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
					View all {props?.comment?.length} comments
				</div>
			</div>
		</div>
	)
}
