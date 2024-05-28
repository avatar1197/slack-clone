import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import "../../App.css"

function Home({setIsLoggedIn, setUser}) {
	const navigate = useNavigate()
	// const [user, setUser] = useState(() =>
	// 	JSON.parse(localStorage.getItem("user"))
	// )
	// const [isLoggedIn, setIsLoggedIn] = useState(!!user)

	// useEffect(() => {
	// 	localStorage.setItem("user", JSON.stringify(user))
	// 	setIsLoggedIn(!!user)
	// }, [user])

	// Function to handle logout
	const handleLogout = () => {
		console.log("Logging out...")
		localStorage.clear() // Clear all local storage data
		setIsLoggedIn(false) // Set logged-in state to false
		setUser(null) // Clear the user state
		navigate("/") // Navigate to the login page
	}

	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Sidebar
					// setIsLoggedIn={setIsLoggedIn}
					// setUser={setUser}
					handleLogout={handleLogout}
				/>
				<main>
					<p>Welcome to your Slack clone!</p>
				</main>
			</div>
		</div>
	)
}

export default Home
