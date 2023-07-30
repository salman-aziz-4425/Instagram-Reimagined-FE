import * as React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import back from '../../assets/back.png'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	border: 'none',
	bgcolor: 'background.paper',
	boxShadow: 24,
	pb: 7
}

export default function CommentShare(props) {
	const [images, setImages] = React.useState([])
	const user = useSelector((state) => state.persistedReducer)

	React.useEffect(() => {
		const index = user.posts?.findIndex((post) => post._id === props.postId)
		setImages(user.posts[index]?.imageUrls)
	}, [props.open, props.postId, user.posts])

	const handleSubmit = () => {}
	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						...style,
						width: 1000,
						height: 800,
						border: 'none',
						overflow: 'hidden'
					}}
				>
					<div className="flex border-y px-2 justify-between items-center py-1 border-y-gray-300">
						<Button onClick={props.handleClose}>
							<img className="w-8 h-8 object-contain" src={back} />
						</Button>

						<p className="font-bold">Add Comment</p>
						<Button onClick={handleSubmit}>
							<h1 className="text-blue-500 font-bold">Share</h1>
						</Button>
					</div>
					<div className="flex h-full">
						<div className="flex-1 border-r border-r-black">
							<div className="flex h-full w-full overflow-x-auto transition ease-in-out duration-300">
								{images.length !== 0 &&
									images.map((image, index) => (
										<img
											className="w-full h-full object-contain"
											key={index}
											src={image}
										/>
									))}
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center pt-6">
							<div className="flex relative">
								<TextField
									id="paragraph-input"
									label="Enter your Comment"
									multiline
									rows={4}
									variant="outlined"
									fullWidth
								/>
							</div>
							<h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-500 to-red-600 mt-20 border-y border-gray-500 w-full text-center py-4">
								Comments
							</h1>
							<div className="flex">
								<img />
								<p>Salman Aziz</p>
							</div>
						</div>
					</div>
				</Box>
			</Modal>
		</React.Fragment>
	)
}
