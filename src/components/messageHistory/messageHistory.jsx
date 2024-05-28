import React, {useState, useEffect} from "react"
import axios from "axios"
import "./messageHistory.css" // You'll create this CSS file to style the messages

function MessageHistory({user, receiverId}) {
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
					`http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=User`,
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

	return (
		<div className="message-history">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`message ${
						msg.sender.id === user.id ? "sent" : "received"
					}`}
				>
					<div className="message-info">
						<span>{msg.sender.id === user.id ? "You" : msg.sender.email}</span>
						<span>{new Date(msg.created_at).toLocaleString()}</span>
					</div>
					<p className="message-body">{msg.body}</p>
				</div>
			))}
		</div>
	)
}

export default MessageHistory
