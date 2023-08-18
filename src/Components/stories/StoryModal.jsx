// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { message } from 'antd'
import deleteIcon from '../../assets/delete.png'
import LinearProgress from '@mui/material/LinearProgress'
import { storydeleteAPI } from '../../services/story'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
}

export default function StoryModal(props) {
	const [storyid, setstoryid] = useState(0)
	const [authorid, setauthor] = useState(0)
	const [loginuserid, setloginuserid] = useState(0)
	const [images, setImages] = React.useState([])
	const [descriptions, setdescriptions] = React.useState([])
	const [expiryDate, setexpiryDate] = React.useState([])
	const [progress, setProgress] = React.useState(0)
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		setImages(props.imageUrls)
		setdescriptions(props.descriptions)
		setexpiryDate(props.expiryDates)
		setauthor(props.authorid)
		setloginuserid(props.loginuserid)
		setstoryid(props.storyid)
	}, [
		props.authorid,
		props.descriptions,
		props.expiryDates,
		props.imageUrls,
		props.loginuserid,
		props.storyid
	])

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0
				}
				const diff = Math.random() * 10
				return Math.min(oldProgress + diff, 100)
			})
		}, 200)
		return () => {
			clearInterval(timer)
		}
	}, [])

	useEffect(() => {
		if (progress === 100) {
			props.handleClose()
		}
	}, [progress, props])

	const ondeleteStory = async (index) => {
		try {
			await storydeleteAPI(storyid, index, loginuserid)
			const updatedDescriptions = descriptions.toSpliced(index, 1)
			const updatedExpiryDate = expiryDate.toSpliced(index, 1)
			const updatedImages = images.toSpliced(index, 1)
			setImages(updatedImages)
			setdescriptions(updatedDescriptions)
			setexpiryDate(updatedExpiryDate)
			if (descriptions.length <= 1) {
				props.handleClose()
			}
			props.setOperation(!props.operation)
			messageApi.open({
				type: 'success',
				content: 'Story deleted'
			})
		} catch {
			messageApi.open({
				type: 'error',
				content: 'Story failed to delete'
			})
		}
	}

	return (
		<div>
			{contextHolder}
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="flex overflow-x-auto overflow-y-hidden w-full h-full text-center relative">
						{images &&
							Date.parse(expiryDate[0]) > Date.now() &&
							images.map((image, index) => (
								<div
									key={index}
									style={{
										flexShrink: 0,
										margin: '0 10px',
										maxWidth: '300px',
										position: 'relative'
									}}
								>
									<LinearProgress
										className="zIndex-1"
										variant="determinate"
										value={progress}
									/>
									<img
										className="h-full w-full object-contain"
										src={image}
										alt={`Image ${index}`}
									/>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											position: 'absolute',
											bottom: '10px',
											left: '10px',
											color: '#fff',
											width: '100%',
											padding: '8px',
											borderRadius: '4px',
											fontSize: '14px',
											alignItems: 'center'
										}}
									>
										<h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
											{descriptions[index]}
										</h1>
										{authorid === loginuserid && (
											<div onClick={() => ondeleteStory(index)}>
												<img
													className="w-10 h-10 object-contain"
													src={deleteIcon}
												/>
											</div>
										)}
									</div>
								</div>
							))}
					</div>
				</Box>
			</Modal>
		</div>
	)
}
