import React, {useState, useEffect} from "react"
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import axios from "axios"
import {API_URL} from "./constants/Constants"
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp" // Assuming you have a SignUp component
import Home from "./pages/home/Home"
import {Button} from "@mui/material"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)

	useEffect(() => {
		if (user) {
			setIsLoggedIn(true)
			localStorage.setItem("user", JSON.stringify(user))
		}
	}, [user])

	const handleSignOut = () => {
		localStorage.removeItem("user")
		setIsLoggedIn(false)
		setUser(null)
	}

	return (
		<Router>
			<div className="App">
				{!isLoggedIn ? (
					<Routes>
						<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
						<Route
							path="/signup"
							element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
						/>
					</Routes>
				) : (
					<Home user={user} handleSignOut={handleSignOut} />
				)}
			</div>
		</Router>
	)
}

export default App
