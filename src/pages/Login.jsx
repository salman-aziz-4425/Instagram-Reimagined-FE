import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { userApi } from '../services/userApi'

import Paragraph from '../components/utils/Paragraph'
import Input from '../components/utils/Input'
import { addUserInfo } from '../redux/userSlice.js'
import { addPosts } from '../redux/postSlice'
import { cloudinaryAssets, paragraphTexts } from '.././utils/constants'

export default function Login() {
	const [user, setUser] = useState({
		phoneNumber: 0,
		password: ''
	})

	const [Notification, contextHolder] = message.useMessage()
	const activeImage = useMemo(
		() => [cloudinaryAssets.FrontImage, cloudinaryAssets.frontImage2],
		[]
	)
	const [Index, setIndex] = useState(0)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [trigger] = userApi.endpoints.loginUser.useLazyQuery()

	useEffect(() => {
		setTimeout(() => {
			if (Index === activeImage.length - 1) {
				setIndex(0)
			} else {
				setIndex(Index + 1)
			}
		}, 3000)
	}, [Index, activeImage.length])

	const onChangeHandler = (event) => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	const inputInformation = [
		{
			name: 'phoneNumber',
			placeholder: 'Phone number',
			type: 'number'
		},
		{
			name: 'password',
			placeholder: 'Password',
			type: 'password'
		}
	]

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		Notification.open({
			type: 'success',
			content: 'Loging in...'
		})
		try {
			if (user.phoneNumber === 0 && user.password === '') {
				Notification.open({
					type: 'error',
					content: 'Fields are empty'
				})
				return
			} else if (user.phoneNumber === 0) {
				Notification.open({
					type: 'error',
					content: 'Please enter phone number'
				})
				return
			} else if (user.password === '') {
				Notification.open({
					type: 'error',
					content: 'password field is empty'
				})
				return
			}

			const userInfo = await trigger({
				phoneNumber: user.phoneNumber,
				password: user.password
			})
			console.log(userInfo.data)
			dispatch(
				addUserInfo({
					...userInfo.data,
					isAuth: true
				})
			)
			dispatch(
				addPosts({
					...userInfo.data
				})
			)
			setTimeout(() => {}, 20000)
			navigate('/Home')
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `${error.response.status}:${error.response.data.error}`
			})
		}
	}

	return (
		<>
			{contextHolder}
			<div className="flex flex-row  w-100 h-100 mt-40 justify-center space-x-4 md:flex w-100 h-100  space-between">
				<div className="w-[24%] relative  transition ease-in-out duration-700">
					<img
						className="object-contain w-100 h-100 absolute"
						src={cloudinaryAssets.BackgroundImage}
						alt="Background"
					></img>
					{activeImage.map((image, idx) => (
						<img
							key={idx}
							className={`object-fit w-[54%] absolute top-[5%] left-[33.5%] transition-opacity ease-in-out duration-[1200ms] ${
								Index === idx ? 'opacity-100' : 'opacity-0'
							}`}
							src={image}
							alt={`Image ${idx}`}
						/>
					))}
				</div>

				<div className="flex flex-col w-[20%] items-center justify-center">
					<div className="flex flex-col font-extrabold  border border-gray-300 px-10">
						<div className="w-40 ml-[25%]">
							<img
								className="mt-5 w-full h-full object-contain"
								src={cloudinaryAssets.InstagramIcon}
							></img>
						</div>
						<div className="flex flex-col  ml-[10%]">
							<div className="mt-10">
								{inputInformation.map((input, index) => (
									<Input
										key={index}
										placeholder={input.placeholder}
										name={input.name}
										type={input.type}
										onChangeHandler={onChangeHandler}
										width={70}
									/>
								))}
							</div>

							<button
								className="bg-blue-400 mt-6 rounded-md text-white py-2 w-[91%]"
								onClick={onSubmitHandler}
							>
								{' '}
								Login
							</button>
						</div>
						<div className="flex flex-row justify-center items-center mt-4 w-full">
							<div className="border border-gray-300 w-[150px] space-x-4 mr-2"></div>
							<p className="text-gray-400 space-x-4">OR</p>
							<div className="border border-gray-300 w-[150px] ml-2"></div>
						</div>
						<div className="flex flex-row w-full items-center ml-[25%] my-4">
							<img
								className="w-6 h-6 space-x-6"
								src={cloudinaryAssets.FacebookIcon}
							></img>
							<h2 className="text-blue-500">Log in with Facebook</h2>
						</div>
					</div>
					<div className="flex flex-col font-extrabold  border border-gray-300 mt-4 w-full ">
						<p className="text-sm font-light my-4 text-center">
							<span className="font-md font-light ">
								Don t have an account?{' '}
							</span>
							<Link to={'/Registeration'}>
								<span className="text-blue-500 font-md font-bold">Sign up</span>
							</Link>
						</p>
					</div>
					<p className="text-center mt-4">Get the app</p>
				</div>

				<div className="flex flex-row">
					<button className="flex bg-black">
						<div className="flex items-center"></div>
					</button>
				</div>
			</div>

			<div className="flex mt-[12%] mx-[25%]">
				{paragraphTexts.map((title, index) => (
					<Paragraph key={index} title={title} />
				))}
			</div>

			<div className="flex ml-[45%] mt-8">
				<p className="text-gray-500 mr-4 text-sm">English</p>
				<p className="text-gray-500 mr-4 text-sm">
					© 2023 Instagram from Meta
				</p>
			</div>
		</>
	)
}
