import { useState, useDeferredValue } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { renderSearchResults } from './renderedSearchResult'
import { styleSearch } from '../../utils/constants'
import { userApi } from '../../services/userApi'

const Search = (props) => {
	const [searchResults, setSearchResults] = useState([])
	const deferredSearch = useDeferredValue(searchResults)
	const [searchUser] = userApi.endpoints.searchUser.useLazyQuery()

	const navigate = useNavigate()
	const LoggedInUser = useSelector((state) => state.user)
	const config = {
		headers: { Authorization: `Bearer ${LoggedInUser.token}` }
	}

	const handleSearch = async (e) => {
		try {
			const response = await searchUser({
				searchTerm: e.target.value,
				headers: config
			})
			setSearchResults(response.data)
		} catch (error) {
			return
		}
	}

	return (
		<>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						...styleSearch,
						width: 400,
						textAlign: 'center',
						borderRadius: 10
					}}
				>
					<Typography
						fontSize={30}
						className="font-extrabold  text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
					>
						Search
					</Typography>
					<Box className="bg-white rounded-md p-4">
						<TextField
							className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							placeholder="Search"
							onChange={handleSearch}
						/>
					</Box>
					<Box className="mt-4">
						{renderSearchResults(deferredSearch, navigate, LoggedInUser._id)}
					</Box>
				</Box>
			</Modal>
		</>
	)
}

export default Search
