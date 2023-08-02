import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useDispatch } from 'react-redux'

import Input from '../components/utils/Input'
import Paragraph from '../components/utils/Paragraph'
import { authenticate } from '../utils/authenticate'
import { addUserInfo } from '../redux/userSlice'
import { addPosts } from '../redux/postSlice'
import { cloudinaryAssets, paragraphTexts } from '../utils/constants'
import { useRegisterUserMutation } from '../services/userApi'

export default function Registeration() {
	const [user, setUser] = useState({
		phoneNumber: 0,
		fullName: '',
		username: '',
		password: '',
		mail: ''
	})

	const [error, setError] = useState({
		phoneNumber: '',
		fullName: '',
		username: '',
		password: '',
		mail: ''
	})

	const [Notification, contextHolder] = message.useMessage()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [registerUser] = useRegisterUserMutation()

	const inputInformation = [
		{
			name: 'phoneNumber',
			placeholder: 'Phone number',
			type: 'Number',
			error: error.phoneNumber
		},
		{
			name: 'fullName',
			placeholder: 'Full Name',
			type: 'text',
			error: error.fullName
		},
		{
			name: 'mail',
			placeholder: 'Email',
			type: 'text',
			error: error.mail
		},
		{
			name: 'username',
			placeholder: 'Username',
			type: 'text',
			error: error.username
		},
		{
			name: 'password',
			placeholder: 'Password',
			type: 'password',
			error: error.password
		}
	]

	const onChangeHandler = (event) => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			const error = authenticate(user)
			setError(error)
			// const userInfo = await registerUserAPI(user)
			const userInfo = await registerUser(user)
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
			setTimeout(() => {
				Notification.open({
					type: 'success',
					content: 'User Created Successfully'
				}).then(() => navigate('/Home'))
			}, 20000)
		} catch (error) {
			Notification.open({
				type: 'error',
				content: `$${error.response.data.error}`
			})
		}
	}
	return (
		<div className="flex flex-col items-center justify-center mt-6">
			{contextHolder}
			<div className="flex flex-col w-1/5 px-2/3 font-extrabold  border border-gray-300  items-center">
				<div className="w-60 h-20 mt-6">
					<img
						className="w-full h-full object-contain"
						src={cloudinaryAssets.InstagramIcon}
					></img>
				</div>

				<div className="w-60 text-gray-500 text-md text-center">
					<p className="text-lg">
						Sign up to see photos and videos from your friends.
					</p>
				</div>

				<button className="bg-blue-400 text-white  w-[80%] mx-4 py-1 rounded-md my-4">
					Log in facebook
				</button>

				<div className="flex flex-row justify-center items-center  w-[80%]">
					<div className="border border-gray-300 w-[150px] space-x-4 mr-2"></div>
					<p className="text-gray-400 space-x-4">OR</p>
					<div className="border border-gray-300 w-[150px] ml-2"></div>
				</div>

				<div className="flex flex-col items-center w-2/5 justify-center">
					{inputInformation.map((input, index) => (
						<Input
							key={index}
							placeholder={input.placeholder}
							name={input.name}
							type={input.type}
							error={input.error}
							onChangeHandler={onChangeHandler}
							width={80}
						/>
					))}
				</div>

				<div className="w-full  text-gray-500 text-md text-center mt-6">
					<p className="text-sm font-light">
						People who use our service may have uploaded your contact
						information to Instagram. Learn more
					</p>
				</div>

				<div className="w-60 text-gray-500 text-md text-center mt-4">
					<p className="text-sm font-light">
						By signing up, you agree to our Terms, Privacy Policy and Cookies
						Policy.
					</p>
				</div>

				<button
					className="bg-blue-400 text-white w-[80%] my-6 py-1 rounded-md"
					onClick={onSubmitHandler}
				>
					Sign Up
				</button>
			</div>
			<div className="flex flex-col font-extrabold  border border-gray-300 mt-4 w-1/5">
				<p className="text-sm font-light text-center my-4">
					<span className="font-md font-light ">Don t have an account? </span>
					<Link to={'/'}>
						<span className="text-blue-500 font-md font-bold">Login</span>
					</Link>
				</p>
			</div>
			<div className="flex mt-[8%] mx-[25%]">
				{paragraphTexts.map((title, index) => (
					<Paragraph key={index} title={title} />
				))}
			</div>

			<div className="flex mt-8">
				<p className="text-gray-500 mr-4 text-sm">English</p>
				<p className="text-gray-500 mr-4 text-sm">
					© 2023 Instagram from Meta
				</p>
			</div>
		</div>
	)
}
