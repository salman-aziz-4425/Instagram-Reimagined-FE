import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { renderSearchResults } from './renderedSearchResult'
import { searchUserAPI } from '../services/user'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3
}

const Search = (props) => {
	const [searchResults, setSearchResults] = useState([])
	const navigate = useNavigate()
	const LoggedInUser = useSelector((state) => state)
	const config = {
		headers: { Authorization: `Bearer ${LoggedInUser.token}` }
	}

	const handleSearch = async (e) => {
		try {
			const response = await searchUserAPI(e.target.value, config)
			setSearchResults(response.data)
		} catch (error) {
			return
		}
	}

	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{ ...style, width: 400, textAlign: 'center', borderRadius: 10 }}
				>
					<h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Search
					</h1>
					<div className="bg-white rounded-md p-4">
						<input
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							placeholder="Search"
							onChange={handleSearch}
						/>
					</div>
					<div className="mt-4">
						{renderSearchResults(searchResults, navigate, LoggedInUser._id)}
					</div>
				</Box>
			</Modal>
		</React.Fragment>
	)
}

export default Search
