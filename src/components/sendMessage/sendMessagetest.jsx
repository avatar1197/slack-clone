import React, {useState} from "react"
import UserService from "../../services/UserService"

function SendMessagetest({user, receiverId}) {
	const [message, setMessage] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!message) {
			alert("Please enter a message")
			return
		}

		const info = {
			receiver_id: receiverId,
			receiver_class: "User",
			body: message,
		}

		try {
			await UserService.sendMsg(user, info)
			setMessage("") // Clear the message input after sending
			alert("Message sent successfully!")
		} catch (error) {
			console.error("Failed to send message:", error)
			alert("Failed to send message")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="send-message-form">
			<input
				type="text"
				className="send-message-input"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type a message..."
				required
			/>
			<button type="submit" className="send-message-button">
				Send
			</button>
		</form>
	)
}

export default SendMessagetest
