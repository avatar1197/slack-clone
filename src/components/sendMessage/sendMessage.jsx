import React, {useState, useEffect} from "react"
import UserService from "../../services/UserService"

function SendMessage({user}) {
	const [receiver, setReceiver] = useState("")
	const [message, setMessage] = useState("")
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	//getting list of users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true)
				const fetchedUsers = await UserService.getUsers(user)
				setUsers(fetchedUsers)
				setLoading(false)
			} catch (error) {
				console.error("Failed to fetch users:", error)
				setError(true)
				setLoading(false)
			}
		}

		fetchUsers()
	}, [user])

	async function handleSubmit(event) {
		event.preventDefault()
		if (!receiver || !message) {
			alert("Please fill out all fields")
			return
		}
		const info = {
			receiver_id: Number(receiver),
			receiver_class: "User",
			body: message,
		}
		try {
			await UserService.sendMsg(user, info)
			setMessage("") // Clear message input after sending
			alert("Message sent successfully!")
		} catch (error) {
			console.error("Failed to send message:", error)
			alert("Failed to send message")
		}
	}

	if (loading) return <div>Loading users...</div>
	if (error) return <div>Error fetching users. Please try again later.</div>

	return (
		<div className="sendMessage">
			<form onSubmit={handleSubmit}>
				<label>Send to:</label>
				<select
					className="input-style"
					value={receiver}
					onChange={(event) => setReceiver(event.target.value)}
					required
				>
					<option value="">Select a user</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.email} (ID: {user.id})
						</option>
					))}
				</select>
				<label>Message:</label>
				<input
					type="text"
					className="input-style"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					required
				></input>
				<button type="submit">Send Message</button>
			</form>
		</div>
	)
}

export default SendMessage
