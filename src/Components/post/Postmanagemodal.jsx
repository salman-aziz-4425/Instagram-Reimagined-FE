// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'
import { updatePostVisibility } from '../../features/userSlice'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 300,
	borderRadius: 2,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	textAlign: 'center'
}

export default function Postmanagemodal({
	handleClose,
	open,
	postId,
	deletePost,
	handleUpdateModal,
	privateStatus,
	setprivatePost
}) {
	const dispatch = useDispatch()
	const changeVisibility = async () => {
		try {
			await axios.put('http://localhost:3000/updateVisibility', {
				postId: postId,
				visibility: !privateStatus
			})
			dispatch(
				updatePostVisibility({
					_id: postId,
					visibility: !privateStatus
				})
			)
			setprivatePost(!privateStatus)
			alert('Visibility changes')
		} catch (error) {
			alert(error)
		}
	}
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p
						className="text-red-700 font-bold text-md border-b border-b-gray-500 cursor-pointer my-4"
						onClick={() => deletePost(postId)}
					>
						Delete
					</p>
					<p
						className="text-black font-bold text-md border-b border-b-gray-500 cursor-pointer my-4"
						onClick={() => handleUpdateModal(true)}
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
			</Modal>
		</div>
	)
}
