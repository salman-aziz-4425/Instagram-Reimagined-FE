// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from '../Components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import Posthandler from '../Components/post/Posthandler'
import { updateUserPic, updateVisibilityUser } from '../features/userSlice'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function Profile() {
	const location = useLocation()
	const userData = useSelector((state) => state.persistedReducer)
	let user = []
	if (location.state.loc === '/profile') {
		user = userData
	} else {
		user = location.state.Searchuser
	}

	console.log(location)
	const dispatch = useDispatch()

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			return
		}

		const formData = new FormData()
		formData.append('userId', user._id)
		formData.append('image', event.target.files[0])
		try {
			await axios.put('http://localhost:3000/updateProfile', formData)
			dispatch(
				updateUserPic({
					imageUrl: URL.createObjectURL(event.target.files[0]),
					_id: user._id
				})
			)
			alert('Profile pic updated')
		} catch (error) {
			alert(error.message)
		}
	}

	const changeVisibility = async () => {
		try {
			await axios.put('http://localhost:3000/updateVisibility', {
				userId: user._id,
				visibility: !user.visibility
			})
			dispatch(updateVisibilityUser(!user.visibility))
			alert('Visibility changes')
		} catch {
			alert('Something went wrong')
		}
	}

	return (
		<div className="flex  text-black px-2">
			<SideBar />

			<main className="flex-1 bg-gray-100 bg-opacity-25 ml-[10%]">
				<div className="lg:w-8/12 lg:mx-auto mb-8">
					<header className="flex flex-wrap items-center p-4 md:py-8">
						<div className="md:w-3/12 md:ml-16">
							<img
								className="w-20 h-20 md:w-40 md:h-40 object-contain rounded-full border-2 border-pink-600 p-1 "
								src={
									(location.state.loc === '/profile'
										? user.profilePic
										: user.profilePictureUrl) ||
									'https://www.bytewebster.com/img/logo.png'
								}
								alt="profile"
							/>
							<br></br>
							{userData._id === location.state.Searchuser._id && (
								<input
									type="file"
									onChange={(e) => {
										handleSubmit(e)
									}}
								></input>
							)}
							{userData._id === location.state.Searchuser._id && (
								<Button
									className="bg-blue-600 text-white p-4 rounded-sm mt-10"
									title="Change Visibility"
									onClick={changeVisibility}
								>
									{user.visibility ? (
										<p>make it public</p>
									) : (
										<p>Make it private</p>
									)}
								</Button>
							)}
						</div>

						<div className="w-8/12 md:w-7/12 ml-4">
							<div className="md:flex md:flex-wrap md:items-center mb-4">
								<h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
									{user.username}
								</h2>

								<span
									className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
									aria-hidden="true"
								>
									<i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
								</span>
								{userData._id !== location.state.Searchuser._id && (
									<p
										href="#"
										className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded  text-center sm:inline-block block cursor-pointer"
									>
										Follow
									</p>
								)}
							</div>

							<ul className="hidden md:flex space-x-8 mb-4">
								<li>
									<span className="font-semibold">{user.posts.length}</span>{' '}
									posts
								</li>
								<li>
									<span className="font-semibold">0</span> followers
								</li>
								<li>
									<span className="font-semibold">0</span> following
								</li>
							</ul>
						</div>
					</header>

					{/* posts */}
					<div className="px-px md:px-3">
						{/* user following for mobile only */}
						<ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
							<li>
								<span className="font-semibold text-gray-800 block">6</span>
								posts
							</li>
							<li>
								<span className="font-semibold text-gray-800 block">50.5k</span>
								followers
							</li>
							<li>
								<span className="font-semibold text-gray-800 block">10</span>
								following
							</li>
						</ul>
						<br />
						<br />

						<ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
							<li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
								<a className="inline-block p-3" href="#">
									<i className="fas fa-th-large text-xl md:text-xs"></i>
									<span className="hidden md:inline">post</span>
								</a>
							</li>
						</ul>
						{<Posthandler usersData={user} />}
					</div>
				</div>
			</main>
		</div>
	)
}
