// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Posthandler from '../Components/post/Posthandler'
import {
	updateUserPicAPI,
	followRequestAPI,
	acceptRequestAPI,
	rejectRequestAPI,
	updateVisibilityAPI
} from '../services/user'

import {
	addFollowingRequest,
	updateUserPic,
	acceptFollowerRequest,
	updateVisibilityUser
} from '../features/userSlice'
import ImageUploader from '../Components/UI/ImageUploader'
import userDefaultPic from '../assets/user.png'

export default function Profile() {
	const [followStatus, setFollowStatus] = useState('Follow')
	const [followersCount, setfollowersCount] = useState(0)
	const [followingCount, setfollowingCount] = useState(0)
	const [viewAuth, setviewAuth] = useState(0)

	const location = useLocation()
	const dispatch = useDispatch()
	const LoggedInUser = useSelector((state) => state)
	const [messageApi, contextHolder] = message.useMessage()

	const user =
		location?.state?.loc === '/profile'
			? LoggedInUser
			: location.state?.Searchuser

	const config = {
		headers: { Authorization: `Bearer ${LoggedInUser.token}` }
	}

	const isRequested = useMemo(
		() =>
			LoggedInUser.followers.find((follow) => follow?.user === user?._id)
				?.status === 'pending',
		[LoggedInUser.followers, user?._id]
	)

	const isAccepted = useMemo(
		() =>
			LoggedInUser.followers.find((follow) => follow?.user === user?._id)
				?.status === 'accepted',
		[LoggedInUser.followers, user?._id]
	)

	const isFollowed = useMemo(
		() =>
			LoggedInUser.followers.some((follow) => follow?.user === user?._id) &&
			!LoggedInUser.following.some(
				(followingUser) => followingUser?.user === user?._id
			),
		[LoggedInUser.followers, LoggedInUser.following, user?._id]
	)

	useEffect(() => {
		if (LoggedInUser._id !== user._id) {
			const isRequested = LoggedInUser?.following.find(
				(search) => search.user === user?._id
			)
			if (isRequested) {
				setFollowStatus(isRequested?.status)
			}
		}

		if (location.state.loc === '/profile') {
			setfollowersCount(
				LoggedInUser.followers.filter((user) => user.status === 'accepted')
					.length
			)
			setfollowingCount(
				LoggedInUser.following.filter((user) => user.status === 'accepted')
					.length
			)
		} else if (location.state.loc === '/search') {
			setfollowersCount(
				user.followers.filter((user) => user.status === 'accepted').length
			)
			setfollowingCount(
				user.following.filter((user) => user.status === 'accepted').length
			)
		}

		setviewAuth(
			user.followers.findIndex(
				(follower) =>
					follower.user === LoggedInUser._id && follower.status === 'accepted'
			) !== -1
		)
	}, [LoggedInUser, location.state.loc, user])

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (event.target?.files.length === 0) {
			return
		}
		try {
			await updateUserPicAPI(user?._id, event.target?.files[0], config)
			dispatch(
				updateUserPic({
					imageUrl: URL.createObjectURL(event.target?.files[0]),
					_id: user?._id
				})
			)
			messageApi.open({
				type: 'success',
				content: 'Profile pic updated'
			})
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Failed to update pic'
			})
		}
	}

	const handleFollow = async () => {
		console.log(isFollowed)
		try {
			await followRequestAPI(LoggedInUser._id, user._id, 'pending', config)
			dispatch(
				addFollowingRequest({
					user: user._id,
					status: 'pending'
				})
			)

			messageApi.open({
				type: 'success',
				content: isFollowed ? 'Followed back' : 'Request sended'
			})
			setFollowStatus('accepted')
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Error sending follow request'
			})
		}
	}

	const handleFollowAccept = async () => {
		try {
			await acceptRequestAPI(LoggedInUser._id, user._id, 'accepted', config)
			dispatch(
				acceptFollowerRequest({
					user: user._id,
					status: 'accepted'
				})
			)
			setFollowStatus('Follow back')
			messageApi.open({
				type: 'success',
				content: 'request accepted'
			})
		} catch {
			messageApi.open({
				type: 'error',
				content: 'error accepting request'
			})
		}
	}

	const handleFollowReject = async () => {
		await rejectRequestAPI(LoggedInUser._id, user._id, config)
		dispatch(
			acceptFollowerRequest({
				user: user._id,
				status: 'rejected'
			})
		)
		setFollowStatus('Follow')
		alert('request rejected')
	}
	const changeVisibility = async () => {
		try {
			await updateVisibilityAPI(user._id, !user.visibility, config)
			dispatch(updateVisibilityUser(!user.visibility))
			messageApi.open({
				type: 'success',
				content: user.visibility ? 'Profile is public' : 'Profile is private'
			})
		} catch {
			messageApi.open({
				type: 'error',
				content: 'error updating profile'
			})
		}
	}

	return (
		<div className="flex  text-black px-2">
			{contextHolder}
			<SideBar />

			<main className="flex-1 bg-gray-100 bg-opacity-25 ml-[10%]">
				<div className="lg:w-8/12 lg:mx-auto mb-8">
					<header className="flex flex-wrap items-center p-4 md:py-8">
						<div className="md:w-3/12 md:ml-16">
							<img
								className="w-20 h-20 md:w-40 md:h-40 object-contain rounded-full border-2 border-pink-600 p-1 "
								src={
									(location.state.loc === '/profile'
										? user?.profilePic
										: user?.profilePictureUrl) || userDefaultPic
								}
								alt="profile"
							/>
							<br></br>
							{location.state.loc === '/profile' && (
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
							<div className="md:flex md:flex-row md:items-center mb-4">
								<h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
									{user.username}
								</h2>

								<span
									className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
									aria-hidden="true"
								>
									<i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
								</span>
								{LoggedInUser._id === location.state?.Searchuser._id && (
									<ImageUploader handleSubmit={handleSubmit} mode="profile" />
								)}
								{LoggedInUser._id !== location.state?.Searchuser?._id && (
									<>
										{isRequested ? (
											<div className="flex w-full">
												<p
													className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded  text-center sm:inline-block block cursor-pointer"
													onClick={handleFollowAccept}
												>
													Accept
												</p>
												<p
													className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded  text-center sm:inline-block block cursor-pointer ml-4"
													onClick={handleFollowReject}
												>
													Reject
												</p>
											</div>
										) : (
											<p
												className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded text-center sm:inline-block block cursor-pointer"
												onClick={
													followStatus !== 'pending' &&
													followStatus !== 'accepted' &&
													handleFollow
												}
											>
												{followStatus === 'pending' && 'Pending'}
												{isAccepted === true &&
													isFollowed === false &&
													followStatus !== 'pending' &&
													'Accepted'}
												{isFollowed === true && 'Follow back'}
												{followStatus === 'Follow' &&
													isFollowed === false &&
													'Follow'}
												{isFollowed === false &&
													isAccepted === false &&
													isRequested === false &&
													followStatus !== 'Follow' &&
													followStatus !== 'pending' &&
													'Accepted'}
											</p>
										)}
									</>
								)}
							</div>

							<ul className="hidden md:flex space-x-8 mb-4">
								<li>
									<span className="font-semibold">{user.posts.length}</span>{' '}
									posts
								</li>
								<li>
									<span className="font-semibold">{followersCount}</span>{' '}
									followers
								</li>
								<li>
									<span className="font-semibold">{followingCount}</span>{' '}
									following
								</li>
							</ul>
						</div>
					</header>

					<div className="px-px md:px-3">
						<ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
							<li>
								<span className="font-semibold text-gray-800 block">6</span>
								posts
							</li>
							<li>
								<span className="font-semibold text-gray-800 block">
									{followersCount}
								</span>
								followers
							</li>
							<li>
								<span className="font-semibold text-gray-800 block">10</span>
								{followingCount}
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
						{location.state.loc === '/profile' ||
						user.visibility === false ||
						viewAuth === true ? (
							<Posthandler SearchusersData={user} path={location.state.loc} />
						) : (
							<h1 className="font-extrabold text-transparent text-4xl border-y border-gray-500xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-20  w-full text-center py-4">
								This thread is private
							</h1>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
