import React, {useState, useEffect} from "react"
import Avatar from "@mui/material/Avatar"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SearchIcon from "@mui/icons-material/Search"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import "./Header.css"

function Header() {
	const [user, setUser] = useState({
		displayName: "",
		avatarColor: "deepPurple[500]", // Default color if not set
	})

	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		if (storedUser) {
			const userData = JSON.parse(storedUser)
			setUser({
				displayName: userData.uid.split("@")[0], // Use email before '@' as displayName
				avatarColor: "deepPurple[500]", // Default color
			})
		}
	}, [])

	const avatarLetter = user.displayName
		? user.displayName[0].toUpperCase()
		: "X"

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
