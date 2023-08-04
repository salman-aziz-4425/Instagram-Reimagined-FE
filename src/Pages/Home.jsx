// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../Components/SideBar'
import Follower from '../Components/Follower'
import Posthandler from '../Components/post/Posthandler'

export default function Home() {
	const user = useSelector((state) => state.persistedReducer)
	return (
		<div className="flex justify-between text-black px-2">
			<SideBar />
			<div className=" flex flex-col w-[80%]">
				<div className="my-[7%] text-black text-center">
					<h1>stories</h1>
				</div>

				<Posthandler usersData={user} />
			</div>
			<Follower />
		</div>
	)
}
