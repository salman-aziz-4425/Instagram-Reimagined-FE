import userDefaultPic from '../assets/user.png'

export const renderSearchResults = (searchResults, navigate, loginUserid) => {
	return searchResults.map((user) => (
		<div
			key={user._id}
			className="flex items-center mb-2 cursor-pointer"
			onClick={() =>
				navigate('/profile', {
					state: {
						Searchuser: user,
						loc: user._id === loginUserid ? '/profile' : '/search'
					}
				})
			}
		>
			<img
				src={user.profilePictureUrl || userDefaultPic}
				alt="User Profile"
				className="w-10 h-10 rounded-full mr-3"
			/>
			<span className="text-lg">{user.username}</span>
		</div>
	))
}
