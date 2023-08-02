import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import { Button, TextField } from '@mui/material'
import { message } from 'antd'

import { addUserStories } from '../../redux/userSlice'
import { updateUsersPost, addUsersPost } from '../../redux/postSlice'
import ImageUploader from '../utils/ImageUploader'
import { stylePost, cloudinaryAssets } from '../../utils/constants'
import {
	useAddPostMutation,
	useUpdatePostMutation
} from '../../services/postsApi'
import { useAddStoryMutation } from '../../services/storiesApi'

export default function PostModal(props) {
	const [description, setDescription] = React.useState('')
	const [imageFiles, setImageFiles] = React.useState([])
	const [images, setImages] = React.useState([])
	const [loader, setloader] = React.useState(false)
	const [Notification, contextHolder] = message.useMessage()
	const [addPost] = useAddPostMutation()
	const [addStory] = useAddStoryMutation()
	const [updatePost] = useUpdatePostMutation()

	const user = useSelector((state) => state.user)
	const posts = useSelector((state) => state.posts)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (props.status === 'UpdateModal') {
			const index = posts?.findIndex((post) => post._id === props.postId)
			setImages(posts[index]?.imageUrls)
		} else {
			setImages([])
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.open])

	const config = {
		headers: { Authorization: `Bearer ${user.token}` }
	}

	const fileSelectedHandler = (e) => {
		const selectedFiles = Array.from(e.target.files)
		const createURL = selectedFiles.map((file) => {
			return URL.createObjectURL(file)
		})
		if (e.target.files && e.target.files.length > 0) {
			const isImage = Array.from(e.target.files).every((file) =>
				file.type.startsWith('image/')
			)

			if (!isImage) {
				Notification.open({
					type: 'error',
					content: 'Only images are allowed'
				})
				return
			}
		}
		const maxSize = 2 * 1024 * 1024

		if (
			maxSize &&
			Array.from(e.target.files).some((file) => file.size > maxSize)
		) {
			Notification.open({
				type: 'error',
				content: `File size exceeds the limit of ${maxSize / (1024 * 1024)} MB.`
			})
			return
		}
		setImageFiles(e.target.files)
		setImages(createURL)
	}

	const onRemoveImage = (index) => {
		const updatedImages = [...images]
		const updatedfiles = [...imageFiles]
		updatedImages.splice(index, 1)
		updatedfiles.splice(index, 1)
		setImages(updatedImages)
		setImageFiles(updatedfiles)
	}

	const onPostAdd = async (event) => {
		event.preventDefault()
		setloader(true)
		if (description === '') {
			Notification.open({
				type: 'error',
				content: 'Fill the description '
			})
			setloader(false)
			return
		}
		if (images.length === 0) {
			Notification.open({
				type: 'error',
				content: 'Please upload image'
			})
			setloader(false)
			return
		}

		try {
			if (images.length > 10) {
				Notification.open({
					type: 'error',
					content: 'Images limit exceeded'
				})
				setloader(false)
				return
			}

			const response = await addPost({
				id: user._id,
				description,
				imageFiles,
				token: user.token
			})
			dispatch(
				addUsersPost({
					_id: response.data?.postId,
					userId: user,
					imageUrls: images,
					description: description,
					likes: [],
					likesIn: {},
					comment: [],
					privateStatus: false
				})
			)
			Notification.open({
				type: 'success',
				content: 'Post shared successfully'
			})
			setloader(false)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: 'Something went Wrong'
			})
			setloader(false)
		}
	}

	const onPostUpdate = async (event) => {
		event.preventDefault()
		setloader(true)
		if (description.length === 0) {
			Notification.open({
				type: 'error',
				content: 'Fill the description '
			})
			return
		}
		try {
			await updatePost({ id: props.postId, description, headers: config })
			dispatch(
				updateUsersPost({
					_id: props.postId,
					description: description
				})
			)
			Notification.open({
				type: 'success',
				content: 'Post Updated successfully'
			})
			setloader(false)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
			setloader(false)
		}
	}

	const onStoryAdd = async (event) => {
		event.preventDefault()
		setloader(true)
		if (description === '') {
			Notification.open({
				type: 'error',
				content: 'Fill the description '
			})
			setloader(false)
			return
		}
		if (images.length === 0) {
			Notification.open({
				type: 'error',
				content: 'Please upload image'
			})
			setloader(false)
			return
		} else if (images.length > 1) {
			Notification.open({
				type: 'error',
				content: 'Images limit exceeded'
			})
			setloader(false)
			return
		}

		try {
			const response = await addStory({
				id: user._id,
				description,
				imageFiles: imageFiles[0],
				headers: config
			})
			dispatch(
				addUserStories({
					_id: response.data?.id,
					userId: user,
					imageUrls: images[0],
					description: description
				})
			)
			Notification.open({
				type: 'success',
				content: 'Story shared successfully'
			})
			setloader(false)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
			setloader(false)
		}
	}

	return (
		<>
			{contextHolder}
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						...stylePost,
						width: 1000,
						height: 800,
						border: 'none',
						overflow: 'hidden'
					}}
				>
					<Box
						className="flex border-y px-2 justify-between items-center py-1 border-y-gray-300"
						component="div"
					>
						<Button onClick={props.handleClose}>
							<img
								className="w-8 h-8 object-contain"
								src={cloudinaryAssets.BackIcon}
								alt=""
							/>
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
						{loader ? (
							<CircularProgress />
						) : (
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
						)}
					</Box>
					<Box className="flex h-full">
						<Box
							className="flex-1 border-r h-full border-r-black align-middle overflow-y-auto"
							component="div"
						>
							{images.length === 0 ? (
								<Box className="h-full justify-center items-center align-middle my-[50%]">
									<ImageUploader
										handleSubmit={fileSelectedHandler}
										mode="Post Share"
									/>
								</Box>
							) : (
								<Box className="flex overflow-y-scroll transition ease-in-out duration-300">
									<Box className="flex flex-col w-full justify-center align-middle space-y-4 overflow-y-auto ">
										{images.map((image, index) => (
											<Box key={index} className="relative group">
												<img
													className="w-full h-64  object-contain rounded-lg"
													src={image}
													alt=""
												/>
												<img
													className="w-8 h-8 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer"
													src={cloudinaryAssets.DeleteIcon}
													alt=""
													onClick={() => onRemoveImage(index)}
												/>
											</Box>
										))}
									</Box>
								</Box>
							)}
						</Box>
						<Box
							className="flex-1 flex flex-col items-center pt-6"
							component="div"
						>
							<Box className="flex px-4 py-4 relative w-full">
								<TextField
									sx={{ width: '100%' }}
									id="paragraph-input"
									label="Enter your Comment"
									multiline
									rows={10}
									variant="outlined"
									fullWidth
									onChange={(e) => setDescription(e.target.value)}
									className=" border rounded-lg p-2"
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Modal>
		</>
	)
}
