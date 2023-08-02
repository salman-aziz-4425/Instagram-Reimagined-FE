import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import { message } from 'antd'
import back from '../../assets/back.png'
import {
	addUserStories,
	addUsersPost,
	updateUsersPost
} from '../../features/userSlice'
import ImageUploader from '../UI/ImageUploader'
import { addPostAPI, updatePostAPI } from '../../services/post'
import { storyAddAPI } from '../../services/story'
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
	const [messageApi, contextHolder] = message.useMessage()

	const user = useSelector((state) => state)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (props.status === 'UpdateModal') {
			const index = user.posts?.findIndex((post) => post._id === props.postId)
			setImages(user.posts[index]?.imageUrls)
		} else {
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

	const onPostAdd = async (event) => {
		event.preventDefault()

		if (description.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Fill the description '
			})
			return
		}
		if (images.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Please upload image'
			})
			return
		}

		try {
			if (images.length === 10) {
				messageApi.open({
					type: 'error',
					content: 'Images limit exceeded'
				})
				return
			}

			const response = await addPostAPI(
				user._id,
				description,
				imageFiles,
				user.token
			)
			dispatch(
				addUsersPost({
					_id: response.data?.id,
					userId: user,
					imageUrls: images,
					description: description,
					comment: [],
					privateStatus: false
				})
			)
			messageApi.open({
				type: 'success',
				content: 'Post shared successfully'
			})
		} catch (error) {
			console.log(error)
			messageApi.open({
				type: 'error',
				content: 'Something went Wrong'
			})
		}
	}

	const onPostUpdate = async (event) => {
		event.preventDefault()
		if (description.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Fill the description '
			})
			return
		}
		if (images.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Please upload image'
			})
			return
		}
		try {
			await updatePostAPI(props.postId, description)
			dispatch(
				updateUsersPost({
					_id: props.postId,
					description: description
				})
			)
			messageApi.open({
				type: 'success',
				content: 'Post Updated successfully'
			})
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Something went Wrong'
			})
		}
	}

	const onStoryAdd = async (event) => {
		event.preventDefault()

		if (description.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Fill the description '
			})
			return
		}
		if (images.length === 0) {
			messageApi.open({
				type: 'error',
				content: 'Please upload image'
			})
			return
		}

		try {
			const response = await storyAddAPI(user._id, description, imageFiles[0])
			dispatch(
				addUserStories({
					_id: response.data?.id,
					userId: user,
					imageUrls: images[0],
					description: description
				})
			)
			messageApi.open({
				type: 'success',
				content: 'Story shared successfully'
			})
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Something went Wrong'
			})
		}
	}

	return (
		<React.Fragment>
			{contextHolder}
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
						{props.status === 'SideBar' && (
							<p className="font-bold">Create new Post</p>
						)}
						{props.status === 'UpdateModal' && (
							<p className="font-bold">Update Post</p>
						)}
						{props.status === 'Story' && (
							<p className="font-bold">Create new Story</p>
						)}
						<Button
							onClick={(e) => {
								if (props.status === 'SideBar') {
									onPostAdd(e)
								} else if (props.status === 'UpdateModal') {
									onPostUpdate(e)
								} else {
									onStoryAdd(e)
								}
							}}
						>
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
