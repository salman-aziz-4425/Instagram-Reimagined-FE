import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { cloudinaryAssets, styleNotification } from '../../utils/constants'
import { useGetFollowersQuery } from '../../services/postsApi'

export default function Notifications(props) {
	const user = useSelector((state) => state.user)
	const [pending, setPending] = useState([])
	const navigate = useNavigate()
	const config = {
		headers: { Authorization: `Bearer ${user.token}` }
	}
	const { data, isLoading } = useGetFollowersQuery({
		followers: user.followers
			.filter((follow) => follow.status === 'pending')
			.map((follow) => follow.user),
		headers: config
	})

	useEffect(() => {
		async function fetchData() {
			if (!isLoading) {
				setPending(data)
			}
		}
		if (props.open) {
			fetchData()
		}
	}, [data, isLoading, props.handleOpen, props.open])

	return (
		<Box>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={styleNotification} className="bg-white rounded-lg p-6">
					<Typography
						fontSize={30}
						fontWeight={100}
						className="text-center text-4xl text-purple-400 mb-4"
					>
						Notifications
					</Typography>
					{pending.length > 0 ? (
						pending.map((follower) => (
							<Box
								className="flex items-center space-x-4 py-4 border-b border-gray-300 cursor-pointer hover:bg-gray-300 rounded-md ease-in-out duration-300"
								key={follower._id}
								onClick={() => {
									navigate('/profile', {
										state: {
											Searchuser: follower,
											loc: '/search'
										}
									})
								}}
							>
								<Box className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
									<img
										className="w-full h-full object-cover"
										src={
											follower.profilePictureUrl ||
											cloudinaryAssets.DefaultProfileIcon
										}
										alt={`${follower.username} Profile`}
									/>
								</Box>
								<Box className="flex-1">
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										<span className="font-bold text-gray-700">
											{follower.username}
										</span>{' '}
										wants to follow you.
									</Typography>
								</Box>
							</Box>
						))
					) : (
						<Typography
							fontSize={20}
							fontWeight={100}
							className="font-extrabold text-center text-xl text-red-400 mt-6"
						>
							Nothing
						</Typography>
					)}
				</Box>
			</Modal>
		</Box>
	)
}
