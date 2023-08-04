import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InstaLogo from '../assets/Instagram_logo.svg.png'
import addLogo from '../assets/add.png'
import search from '../assets/search.png'
import profilePic from '../assets/profile.png'
import logout from '../assets/logout.png'
import PostModal from '../Components/post/PostShare'
import { addUserInfo } from '../features/userSlice'
import Search from './Search'

export default function SwipeableTemporaryDrawer() {
	const [open, setOpen] = React.useState(false)
	const [searchOpen, setsearchOpen] = React.useState(false)
	const navigate = useNavigate()
	const user = useSelector((state) => state.persistedReducer)
	const dispatch = useDispatch()

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const handleSearchOpen = () => {
		console.log(searchOpen)
		setsearchOpen(true)
	}
	const handleSearchClose = () => {
		setsearchOpen(false)
	}

	const ListItems = [
		{
			Icons: addLogo,
			title: 'Create',
			onClick: handleOpen
		},
		{
			Icons: profilePic,
			title: 'Profile',
			onClick: () =>
				navigate('/profile', {
					state: { Searchuser: user, loc: '/profile' }
				})
		},
		{
			Icons: search,
			title: 'Search',
			onClick: handleSearchOpen
		},
		{
			Icons: logout,
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
				navigate('/')
			}
		}
	]
	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
			role="presentation"
		>
			<div className="align-middle px-10 pt-6">
				<Link to={'/Home'}>
					<img className="object-contain" src={InstaLogo}></img>
				</Link>
			</div>
			<List className="flex flex-col justify-center">
				{ListItems.map((text) => (
					<div
						key={text.title}
						className="flex px-2 items-center hover:bg-gray-300 transition ease-in-out rounded-md duration-300 mx-4 my-4"
						onClick={text.onClick}
					>
						<img className="bg-transparent w-8 h-8" src={text.Icons}></img>
						<ListItem key={text.title} className="font-bold">
							{text.title}
						</ListItem>
					</div>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<React.Fragment key="left">
				<Drawer variant="permanent">{list('left')}</Drawer>
			</React.Fragment>
			<PostModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				status="SideBar"
			/>
			<Search
				open={searchOpen}
				handleOpen={handleSearchOpen}
				handleClose={handleSearchClose}
			/>
		</div>
	)
}
