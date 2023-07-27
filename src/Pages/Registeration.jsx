//eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InstaLogo from '../assets/Instagram_logo.svg.png'
import Input from '../Components/Input'
import Paragraph from '../Components/Paragraph'
import { Authenticate } from '../utils/Authenticate'

export default function Registeration() {
	const [user, setUser] = useState({
		PhoneNumber: 0,
		fullName: '',
		Username: '',
		Password: ''
	})

	const [error, setError] = useState({
		PhoneNumber: false,
		fullName: false,
		Username: false,
		Password: false
	})

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

	const inputInformation = [
		{
			name: 'PhoneNumber',
			placeholder: 'Phone number',
			type: 'Number',
			error: error.PhoneNumber
		},
		{
			name: 'fullName',
			placeholder: 'Full Name',
			type: 'text',
			error: error.fullName
		},
		{
			name: 'Username',
			placeholder: 'Username',
			type: 'text',
			error: error.Username
		},
		{
			name: 'Password',
			placeholder: 'Full Name',
			type: 'text',
			error: error.Password
		}
	]

	const onChangeHandler = (event) => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	const onSubmitHandler = () => {
		setError(Authenticate(user))
		console.log(Authenticate(user))
	}
	return (
		<div className="flex flex-col items-center justify-center mt-6">
			<div className="flex flex-col w-1/5 px-2/3 font-extrabold  border border-gray-300  items-center">
				<div className="w-60 h-20 mt-6">
					<img className="w-full h-full object-contain" src={InstaLogo}></img>
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
