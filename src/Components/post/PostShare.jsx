import * as React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import back from '../../assets/back.png'
import { addUsersPost, updateUsersPost } from '../../features/userSlice'
import ImageUploader from '../UI/ImageUploader'

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

export default function PostModal(props) {
	const [description, setDescription] = React.useState()
	const [imageFiles, setImageFiles] = React.useState([])
	const [images, setImages] = React.useState([])

	const user = useSelector((state) => state.persistedReducer)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (props.status === 'UpdateModal') {
			console.log('hello')
			const index = user.posts?.findIndex((post) => post._id === props.postId)
			setImages(user.posts[index]?.imageUrls)
		} else {
			console.log(props.status)
			setImages([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.open])

	const fileSelectedHandler = (e) => {
		const selectedFiles = Array.from(e.target.files)
		const createURL = selectedFiles.map((file) => {
			return URL.createObjectURL(file)
		})
		setImageFiles(e.target.files)
		setImages(createURL)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const formData = new FormData()

		if (description.length === 0) {
			alert('please fill description')
			return
		}
		if (images.length === 0) {
			alert('please upload image')
			return
		}
		formData.append('userId', user._id)
		formData.append('description', description)

		for (let i = 0; i < images.length; i++) {
			formData.append('images', imageFiles[i])
		}

		try {
			let response = null
			if (props.status === 'SideBar') {
				response = await axios.post('http://localhost:3000/addPost', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				dispatch(
					addUsersPost({
						_id: response.data?.id,
						userId: user,
						imageUrls: images,
						description: description,
						comment: []
					})
				)
				alert('post shared successfully')
			} else {
				response = await axios.put(
					'http://localhost:3000/updatePost',
					{
						postId: props.postId,
						description: description
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				dispatch(
					updateUsersPost({
						_id: props.postId,
						description: description
					})
				)
				alert('post updated successfully')
			}
		} catch (error) {
			alert(error.response.data)
		}
	}

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
						{props.status === 'SideBar' ? (
							<p className="font-bold">Create new Post</p>
						) : (
							<p className="font-bold">Update Post</p>
						)}

						<Button onClick={handleSubmit}>
							<h1 className="text-blue-500 font-bold">Share</h1>
						</Button>
					</div>
					<div className="flex h-full">
						<div className="flex-1 border-r h-full border-r-black align-middle">
							{images.length === 0 ? (
								<div className="h-full justify-center items-center align-middle my-[50%]">
									<ImageUploader
										handleSubmit={fileSelectedHandler}
										mode="Post Share"
									/>
								</div>
							) : (
								<div className="flex h-full w-full overflow-x-auto transition ease-in-out duration-300">
									{images.map((image, index) => (
										<img
											className="w-full h-full object-contain"
											key={index}
											src={image}
										/>
									))}
								</div>
							)}
						</div>
						<div className="flex-1 flex flex-col items-center pt-6">
							<div className="flex relative">
								<TextField
									id="paragraph-input"
									label="Enter your paragraph"
									multiline
									rows={4}
									variant="outlined"
									fullWidth
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</Box>
			</Modal>
		</React.Fragment>
	)
}
