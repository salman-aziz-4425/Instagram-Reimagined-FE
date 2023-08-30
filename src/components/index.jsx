import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PostModal from './post/PostShare'
import { addUserInfo } from '../redux/userSlice'
import Search from './search'
import Notifications from './notification/Notification'
import { removePosts } from '../redux/postSlice'
import { cloudinaryAssets } from '../utils/constants'

export default function SideBar() {
	const [open, setOpen] = useState(false)
	const [searchOpen, setsearchOpen] = useState(false)
	const [openNotification, sethandleNotifyOpen] = useState(false)
	const [currentModal, setcurrentModal] = useState('')
	const navigate = useNavigate()
	const user = useSelector((state) => state)
	const dispatch = useDispatch()

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const handleSearchOpen = () => {
		setsearchOpen(true)
	}
	const handleSearchClose = () => {
		setsearchOpen(false)
	}

	const renderNavListItems = [
		{
			Icons: cloudinaryAssets.CreateIcon,
			title: 'Create',
			onClick: () => {
				setcurrentModal('SideBar')
				handleOpen()
			}
		},
		{
			Icons: cloudinaryAssets.CreateIcon,
			title: 'Stories',
			onClick: () => {
				setcurrentModal('Story')
				handleOpen()
			}
		},
		{
			Icons: cloudinaryAssets.ProfileIcon,
			title: 'Profile',
			onClick: () =>
				navigate('/profile', {
					state: { Searchuser: user, loc: '/profile' }
				})
		},
		{
			Icons: cloudinaryAssets.SearchIcon,
			title: 'Search',
			onClick: handleSearchOpen
		},
		{
			Icons: cloudinaryAssets.NotificationIcon,
			title: 'Notifications',
			onClick: () => sethandleNotifyOpen(true)
		},
		{
			Icons: cloudinaryAssets.LogoutIcon,
			title: 'Logout',
			onClick: () => {
				dispatch(
					addUserInfo({
						user: {
							_id: '',
							phoneNumber: 0,
							fullName: '',
							username: '',
							password: '',
							posts: [],
							isAuth: false,
							token: '',
							profilePic: '',
							visibility: false
						},
						token: '',
						isAuth: false
					})
				)
				dispatch(
					removePosts({
						user: {
							posts: []
						}
					})
				)
				navigate('/')
			}
		}
	]
	const navlist = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
			role="presentation"
		>
			<Box className="align-middle px-10 pt-6">
				<Link to={'/Home'}>
					<img
						className="object-contain"
						src={cloudinaryAssets.InstagramIcon}
					></img>
				</Link>
			</Box>
			<List className="flex flex-col justify-center">
				{renderNavListItems.map((text) => (
					<Box
						key={text.title}
						className="flex px-2 items-center hover:bg-gray-300 transition ease-in-out rounded-md duration-300 mx-4 my-4"
						onClick={text.onClick}
					>
						<img className="bg-transparent w-8 h-8" src={text.Icons}></img>
						<ListItem key={text.title} className="font-bold">
							{text.title}
						</ListItem>
					</Box>
				))}
			</List>
		</Box>
	)

	return (
		<Box>
			<React.Fragment key="left">
				<Drawer variant="permanent">{navlist('left')}</Drawer>
			</React.Fragment>
			<PostModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				status={currentModal}
			/>
			<Search
				open={searchOpen}
				handleOpen={handleSearchOpen}
				handleClose={handleSearchClose}
			/>
			<Notifications
				open={openNotification}
				handleOpen={() => sethandleNotifyOpen(true)}
				handleClose={() => sethandleNotifyOpen(false)}
			/>
		</Box>
	)
}
