// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Input(props) {
	return (
		<input
			className={
				'border border-gray-300 outline-none w-' +
				props.width +
				'% px-4 py-2 mt-2 font-light'
			}
			type={props.type}
			placeholder={props.placeholder}
			name={props.name}
			onChange={props.onChangeHandler}
		></input>
	)
}
