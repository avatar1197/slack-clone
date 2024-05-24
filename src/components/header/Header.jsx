import "./Header.css"
import React, {useState, useEffect} from "react"
import Avatar from "@mui/material/Avatar"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SearchIcon from "@mui/icons-material/Search"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

function Header() {
	// Static user data for demonstration
	const [user, setUser] = useState({
		displayName: "John Doe",
		avatarColor: "deepPurple[500]",
	})

	useEffect(() => {
		// Here you can simulate fetching data from local storage or a static source
		// For now, we'll directly use the static data above
		setUser({
			displayName: "John Doe",
			avatarColor: "deepPurple[500]",
		})
	}, [])

	// Extracting the first letter of the displayName for the avatar
	const avatarLetter = user.displayName ? user.displayName[0] : ""

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
				<Avatar sx={{bgcolor: user.avatarColor}}>{avatarLetter}</Avatar>
			</div>
		</div>
	)
}

export default Header
