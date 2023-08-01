/* eslint-disable no-unused-vars */
import React from 'react'

export default function StoryCard(props) {
	return (
		<>
			<div className="flex flex-col items-center">
				<img
					className="md:w-24 md:h-24 object-contain rounded-full border-2 border-pink-700 p-1 hover:-rotate-6 ease-in-out duration-300 "
					src={props.userDefaultPic}
					alt="profile"
				/>
				<p>{props.username}</p>
			</div>
		</>
	)
}
