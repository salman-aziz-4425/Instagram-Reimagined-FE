// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

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
	handleUpdateModal
}) {
	console.log(postId)
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
				</Box>
			</Modal>
		</div>
	)
}
