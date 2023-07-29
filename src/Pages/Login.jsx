// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import image from '../assets/home-phones-2x.png'
import frontImage from '../assets/iphone-with-profile.png'
import InstaLogo from '../assets/Instagram_logo.svg.png'
import facebookLogo from '../assets/icons8-facebook-48.png'
import Paragraph from '../Components/UI/Paragraph'
import Input from '../Components/UI/Input'
import { addUserInfo } from '../features/userSlice.js'

export default function Login() {
	const [user, setUser] = useState({
		phoneNumber: 0,
		password: ''
	})
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const paragraphTexts = [
		'Meta',
		'About',
		'Blog',
		'Help',
		'Api',
		'Privacy',
		'Terms',
		'Top Accounts',
		'Location',
		'Instagram Lite',
		'Threads',
		'Contact uploading and non users',
		'Meta Verified'
	]

	const onChangeHandler = (event) => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	const inputInformation = [
		{
			name: 'phoneNumber',
			placeholder: 'Phone number'
		},
		{
			name: 'password',
			placeholder: 'Password'
		}
	]

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			const userInfo = await axios.get(
				`http://localhost:3000/loginUser?phoneNumber=${user.phoneNumber}&password=${user.password}`
			)
			dispatch(
				addUserInfo({
					...userInfo.data,
					isAuth: true
				})
			)
			alert('Login successfully')
			navigate('/Home')
		} catch (error) {
			alert(error)
		}
	}
	return (
		<>
			<div className="flex flex-row  w-100 h-100 mt-40 justify-center space-x-4 md:flex w-100 h-100  space-between">
				<div className="w-[24%] relative">
					<img
						className="object-contain w-100 h-100 absolute"
						src={image}
					></img>
					<img
						className=" object-fit w-[55%] absolute top-6 left-[33%]"
						src={frontImage}
					></img>
				</div>

				<div className="flex flex-col w-[20%] items-center justify-center">
					<div className="flex flex-col font-extrabold  border border-gray-300 px-10">
						<div className="w-40 ml-[25%]">
							<img
								className="mt-5 w-full h-full object-contain"
								src={InstaLogo}
							></img>
						</div>
						<div className="flex flex-col  ml-[10%]">
							<div className="mt-10">
								{inputInformation.map((input, index) => (
									<Input
										key={index}
										placeholder={input.placeholder}
										name={input.name}
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
						<div className="flex flex-row w-full items-center ml-[25%] mt-6 ">
							<img className="w-6 h-6 space-x-6" src={facebookLogo}></img>
							<h2 className="text-blue-500">Log in with Facebook</h2>
						</div>
						<p className="text-sm font-light ml-[30%] my-4">
							Forgotten your password?
						</p>
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
