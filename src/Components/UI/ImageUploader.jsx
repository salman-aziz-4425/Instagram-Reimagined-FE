// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function ImageUploader(props) {
	return (
		<label className="flex flex-col w-40 h-40 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 ml-40">
			<div className="flex flex-col items-center justify-center pt-7">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				></svg>
				<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
					{props.mode === 'profile' ? 'Change Profile' : 'Upload Pictures'}
				</p>
			</div>
			<input
				type="file"
				multiple
				className="opacity-0"
				onChange={
					props.mode === 'profile'
						? (e) => props.handleSubmit(e)
						: props.handleSubmit
				}
			/>
		</label>
	)
}
