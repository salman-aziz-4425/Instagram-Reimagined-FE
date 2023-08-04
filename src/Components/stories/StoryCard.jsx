/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import StoryModal from './StoryModal'

export default function StoryCard(props) {
	const [Open, sethandleOpen] = useState(false)
	const handleOpen = () => sethandleOpen(true)
	const handleClose = () => sethandleOpen(false)
	return (
		<>
			<div className="flex flex-col items-center" onClick={handleOpen}>
				<img
					className="md:w-24 md:h-24 object-contain rounded-full border-2 border-pink-700 p-1 hover:-rotate-6 ease-in-out duration-300 "
					src={props.userDefaultPic}
					alt="profile"
				/>
				<p>{props.username}</p>
			</div>
			{Open && (
				<StoryModal
					open={Open}
					handleOpen={handleOpen}
					handleClose={handleClose}
					storyid={props.storyid}
					descriptions={props.descriptions}
					imageUrls={props.imageUrls}
					expiryDates={props.expiryDates}
					authorid={props.authorid}
					loginuserid={props.loginuserid}
					followingStories={props.followingStories}
					setfollowingStories={props.setfollowingStories}
					storyPosition={props.storyPosition}
					setOperation={props.setOperation}
					operation={props.operation}
				/>
			)}
		</>
	)
}
