import React, {useState, useEffect} from "react"
import UserService from "../../services/UserService"

function AddChannel({user, onChannelCreated, handleCloseAddChannel}) {
	const [channelName, setChannelName] = useState("")
	const [users, setUsers] = useState([])
	const [selectedUserIds, setSelectedUserIds] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [message, setMessage] = useState("")

	// Fetch the list of users when the component mounts
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true)
				const usersData = await UserService.getUsers(user)
				setUsers(usersData)
				setLoading(false)
			} catch (error) {
				console.error("Failed to fetch users:", error)
				setError(true)
				setLoading(false)
			}
		}

		fetchUsers()
	}, [user])

	// Handle checkbox change
	const handleCheckboxChange = (userId) => {
		setSelectedUserIds((prevSelectedUserIds) =>
			prevSelectedUserIds.includes(userId)
				? prevSelectedUserIds.filter((id) => id !== userId)
				: [...prevSelectedUserIds, userId]
		)
	}

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!channelName || selectedUserIds.length === 0) {
			setMessage("Please fill out all fields")
			return
		}

		const channel = {
			name: channelName,
			user_ids: selectedUserIds,
		}

		try {
			const response = await UserService.createChannel(user, channel)
			console.log("API response", response)

			if (response && response.data && response.data.id) {
				const channelId = response.data.id // Extracting the ID from api response
				// Extract channel details
				const {id, owner_id, name, created_at} = response.data

				// Create an object to store in local storage
				const channelDetails = {
					id,
					owner_id,
					name,
					created_at,
				}
				// Fetch existing channels from local storage
				const existingChannels =
					JSON.parse(localStorage.getItem("channels")) || []
				// Append the new channel to the existing array of channels
				const updatedChannels = [...existingChannels, channelDetails]
				// Save the updated array of channels back to local storage
				localStorage.setItem("channels", JSON.stringify(updatedChannels))
				localStorage.setItem("ChannelID", channelId) // Storing the Channel ID in localStorage
				setMessage("Channel successfully created.")
				alert(`Channel "${name}" successfully created. ID: ${id}`)
				handleCloseAddChannel()
			} else {
				setMessage("Failed to create channel: Invalid server response")
			}
		} catch (error) {
			console.error("Request failed:", error)
			const errorMessage =
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: "Unknown error"
			setMessage("Failed to create channel: " + errorMessage)
		}
	}

	if (loading) return <div>Loading users...</div>
	if (error) return <div>Error fetching users. Please try again later.</div>

	return (
		<div>
			{message && <div className="message">{message}</div>}
			<form onSubmit={handleSubmit}>
				<label>Channel Name:</label>
				<input
					type="text"
					className="input-style"
					value={channelName}
					onChange={(e) => setChannelName(e.target.value)}
					required
				/>
				<label>Select Users:</label>
				<div
					className="checkbox-group"
					style={{
						height: "200px",
						overflowY: "scroll",
						border: "1px solid #ccc",
						padding: "10px",
						marginBottom: "20px",
					}}
				>
					{users.map((user) => (
						<div
							key={user.id}
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "8px",
							}}
						>
							<input
								type="checkbox"
								id={`user-${user.id}`}
								value={user.id}
								checked={selectedUserIds.includes(user.id)}
								onChange={() => handleCheckboxChange(user.id)}
								style={{marginRight: "10px"}} // Space between checkbox and text
							/>
							<label htmlFor={`user-${user.id}`}>
								{user.email} (ID: {user.id})
							</label>
						</div>
					))}
				</div>
				<button type="submit" style={{marginTop: "20px"}}>
					Create Channel
				</button>
			</form>
		</div>
	)
}

export default AddChannel
