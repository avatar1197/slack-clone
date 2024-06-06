import React, {useState, useEffect} from "react"
import axios from "axios"
import "./messageHistory.css" // You'll create this CSS file to style the messages
import Avatar from "@mui/material/Avatar"
import {deepOrange, deepPurple} from "@mui/material/colors"

function MessageHistory({user, receiverId, type}) {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		async function fetchMessages() {
			try {
				const headers = {
					"access-token": user.accessToken,
					expiry: user.expiry,
					client: user.client,
					uid: user.uid,
				}
				const response = await axios.get(
					`http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${type}`,
					{headers}
				)
				setMessages(response.data.data)
			} catch (error) {
				console.error("Failed to fetch messages:", error)
			}
		}

		if (receiverId) {
			fetchMessages()
		}
	}, [user, receiverId])

	//formatting the avatar
	const getAvatarColor = (isSender) => {
		return isSender ? deepPurple[500] : deepOrange[500]
	}

	return (
		<div className="message-history">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`message-item ${
						msg.sender.id === user.id ? "sent" : "received"
					}`}
				>
					<Avatar
						className="avatar"
						sx={{bgcolor: getAvatarColor(msg.sender.id === user.id)}}
					>
						{msg.sender.email[0].toUpperCase()}
					</Avatar>
					<div className="message-content">
						<div className="message-info">
							<span className="message-sender">
								{msg.sender.id === user.id ? "You" : msg.sender.email}
							</span>
							<span className="message-timestamp">
								{new Date(msg.created_at).toLocaleString()}
							</span>
						</div>
						<p className="message-text">{msg.body}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default MessageHistory
