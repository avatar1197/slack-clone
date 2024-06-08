import React, {useState, useEffect} from "react"
import UserService from "../../services/UserService"

function LoadUsers({user, selectedUserId, onSelectUser}) {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

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

	if (loading) return <div>Loading users...</div>
	if (error) return <div>Error fetching users. Please try again later.</div>

	return (
		<select
			onChange={(e) => onSelectUser(e.target.value)}
			value={selectedUserId}
		>
			<option value="">Select a user</option>
			{users.map((user) => (
				<option key={user.id} value={user.id}>
					{user.email} (ID: {user.id})
				</option>
			))}
		</select>
	)
}

export default LoadUsers
