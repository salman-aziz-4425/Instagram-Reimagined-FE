// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Posthandler from '../Components/post/Posthandler'
import {
	addFollowingRequest,
	updateUserPic,
	acceptFollowerRequest
} from '../features/userSlice'
import ImageUploader from '../Components/UI/ImageUploader'

export default function Profile() {
	const [followStatus, setFollowStatus] = useState('Follow')
	const [followersCount, setfollowersCount] = useState(0)
	const [followingCount, setfollowingCount] = useState(0)

	const location = useLocation()
	const dispatch = useDispatch()
	const LoggedInUser = useSelector((state) => state?.persistedReducer)

	const user =
		location?.state?.loc === '/profile'
			? LoggedInUser
			: location.state?.Searchuser

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

	React.useEffect(() => {
		if (LoggedInUser._id !== user._id) {
			const isRequested = LoggedInUser?.following.find(
				(search) => search.user === user?._id
			)
			if (isRequested) {
				setFollowStatus(isRequested?.status)
			}
		}
		if (location.state.loc === '/profile') {
			console.log(LoggedInUser.followers)
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
	}, [LoggedInUser, location.state.loc, user])

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (event.target?.files.length === 0) {
			return
		}

		const formData = new FormData()
		formData.append('userId', user?._id)
		formData.append('image', event.target?.files[0])
		try {
			await axios.put('http://localhost:3000/updateProfile', formData)
			dispatch(
				updateUserPic({
					imageUrl: URL.createObjectURL(event.target?.files[0]),
					_id: user?._id
				})
			)
			alert('Profile pic updated')
		} catch (error) {
			alert(error?.message)
		}
	}

	const handleFollow = async () => {
		console.log(isFollowed)
		try {
			await axios.post('http://localhost:3000/followRequest', {
				senderId: LoggedInUser._id,
				receiverId: user._id,
				status: isFollowed ? 'accepted' : 'pending'
			})
			dispatch(
				addFollowingRequest({
					user: user._id,
					status: isFollowed ? 'accepted' : 'pending'
				})
			)
			isFollowed ? alert('Followed back') : alert('request sended')
			setFollowStatus('accepted')
		} catch (error) {
			alert('Error sending follow request')
		}
	}

	const handleFollowAccept = async () => {
		await axios.put('http://localhost:3000/acceptRequest', {
			LogedInUserId: LoggedInUser._id,
			requestedUserID: user._id,
			status: 'accepted'
		})
		dispatch(
			acceptFollowerRequest({
				user: user._id,
				status: 'accepted'
			})
		)
		setFollowStatus('Follow back')
		alert('request accepted want to follow back?')
	}

	const handleFollowReject = async () => {
		await axios.put('http://localhost:3000/rejectRequest', {
			LogedInUserId: LoggedInUser._id,
			requestedUserID: user._id
		})
		dispatch(
			acceptFollowerRequest({
				user: user._id,
				status: 'rejected'
			})
		)
		setFollowStatus('Follow')
		alert('request rejected')
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

					{/* posts */}
					<div className="px-px md:px-3">
						{/* user following for mobile only */}
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
						{
							<Posthandler
								SearchusersData={user}
								loginUserid={LoggedInUser._id}
								path={location.state.loc}
							/>
						}
					</div>
				</div>
			</main>
		</div>
	)
}
