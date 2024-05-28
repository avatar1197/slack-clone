import React, {useState, useEffect} from "react"
import Avatar from "@mui/material/Avatar"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SearchIcon from "@mui/icons-material/Search"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import "./Header.css"

function Header() {
	const [avatarUser, setAvatarUser] = useState({
		displayName: "Guest",
		avatarColor: "deepPurple[500]", // Default color if not set
	})

	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		if (storedUser) {
			const userData = JSON.parse(storedUser)
			if (userData && userData.uid) {
				const displayName = userData.uid.split("@")[0] // Use email before '@' as displayName
				setAvatarUser({
					displayName:
						displayName.charAt(0).toUpperCase() + displayName.slice(1), // Capitalize the first letter
					avatarColor: "deepPurple[500]", // Default color
				})
			}
		} else {
			// Reset to default if no user data is found
			setAvatarUser({
				displayName: "Guest",
				avatarColor: "deepPurple[500]",
			})
		}
	}, [])

	const avatarLetter = avatarUser.displayName ? avatarUser.displayName[0] : "X" // Use 'G' for Guest

	return (
		<div className="header">
			<div className="header__left">
				<AccessTimeIcon />
			</div>
			<div className="header__middle">
				<SearchIcon />
				<input placeholder="Search Avion School" />
			</div>
			<div className="header__right">
				<HelpOutlineIcon />
				<Avatar sx={{bgcolor: avatarUser.avatarColor}}>{avatarLetter}</Avatar>
			</div>
		</div>
	)
}

export default Header
