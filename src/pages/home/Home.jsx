import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import SendMessage from "../../components/sendMessage/sendMessage"
import "../../App.css"
import "./Home.css"

function Home({setIsLoggedIn, setUser}) {
	const navigate = useNavigate()
	const handleLogout = () => {
		console.log("Logging out...")
		localStorage.clear() // Clear all local storage data
		setIsLoggedIn(false) // Set logged-in state to false
		setUser(null) // Clear the user state
		navigate("/") // Navigate to the login page
	}

	const user = JSON.parse(localStorage.getItem("user"))

	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Sidebar
					// setIsLoggedIn={setIsLoggedIn}
					// setUser={setUser}
					handleLogout={handleLogout}
				/>
				<main className="home-main">
					<p>Welcome to your Slack clone!</p>
					{/* Conditionally render SendMessage if user is available */}
					{user && <SendMessage user={user} />}
				</main>
			</div>
		</div>
	)
}

export default Home
