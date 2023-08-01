// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useMessage } from '../UI/UseToast'
const Notification = () => {
	const messageApi = useMessage()
	return (
		<>
			{messageApi.visible && (
				<div
					style={{
						marginBottom: 16,
						color: messageApi.message.type === 'error' ? 'red' : 'green'
					}}
				>
					{messageApi.message.content}
					<button onClick={messageApi.close} style={{ marginLeft: 8 }}>
						Close
					</button>
				</div>
			)}
		</>
	)
}

export default Notification
