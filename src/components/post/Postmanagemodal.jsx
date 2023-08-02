import { message } from 'antd'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'

import { updatePostVisibility } from '../../redux/postSlice'
import { stylePostmanage } from '../../utils/constants'
import { useState } from 'react'
import { useUpdatePostStatusMutation } from '../../services/postsApi'

export default function Postmanagemodal({
	handleClose,
	open,
	postId,
	deletePost,
	onUpdateModal,
	privateStatus,
	setprivatePost,
	config
}) {
	const dispatch = useDispatch()
	const [Notification, contextHolder] = message.useMessage()
	const [loading, setloading] = useState(false)
	const [updatePostStatus] = useUpdatePostStatusMutation()
	const changeVisibility = async () => {
		try {
			setloading(true)
			await updatePostStatus({
				id: postId,
				status: !privateStatus,
				headers: config
			})
			dispatch(
				updatePostVisibility({
					_id: postId,
					visibility: !privateStatus
				})
			)
			setprivatePost(!privateStatus)
			Notification.open({
				type: 'success',
				content: 'Post set to ' + (!privateStatus ? 'public' : 'private')
			})
			setloading(false)
			handleClose(true)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
			setloading(false)
			handleClose(true)
		}
	}

	return (
		<Box>
			{contextHolder}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{loading === true ? (
					<CircularProgress />
				) : (
					<Box sx={stylePostmanage}>
						<p
							className="text-red-700 font-bold text-md border-b border-b-gray-500 cursor-pointer my-4"
							onClick={() => {
								setloading(true)
								deletePost(postId)
								setloading(false)
								handleClose(true)
							}}
						>
							Delete
						</p>
						<p
							className="text-black font-bold text-md border-b border-b-gray-500 cursor-pointer my-4"
							onClick={() => {
								setloading(true)
								onUpdateModal(true)
								setloading(false)
								handleClose(true)
							}}
						>
							Edit
						</p>
						<p
							className="text-black font-bold text-md border-b border-b-gray-500 cursor-pointer my-4"
							onClick={changeVisibility}
						>
							{privateStatus ? 'Make it public' : 'Make it private'}
						</p>
					</Box>
				)}
			</Modal>
		</Box>
	)
}
