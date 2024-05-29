import React, {useState, useEffect} from "react"
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom"
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import Home from "./pages/home/Home"

function App() {
	// Fetch user data from local storage and initialize the user state
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)

	// Determine if user is logged in based on the presence of user data
	const [isLoggedIn, setIsLoggedIn] = useState(!!user)

	useEffect(() => {
		// Sync user to localStorage whenever it changes
		if (user) {
			localStorage.setItem("user", JSON.stringify(user))
			setIsLoggedIn(true)
		} else {
			localStorage.removeItem("user")
			setIsLoggedIn(false)
		}
	}, [user])

	// const handleSignOut = () => {
	// 	setUser(null) // This will trigger the useEffect to clear user from local storage and update isLoggedIn
	// }

	return (
		<Router>
			<div className="App">
				<Routes>
					{!isLoggedIn ? (
						<>
							<Route
								path="/"
								element={
									<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
								}
							/>
							<Route
								path="/signup"
								element={
									<SignUp setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
								}
							/>
							<Route path="*" element={<Navigate replace to="/" />} />
						</>
					) : (
						<>
							<Route
								path="/home"
								element={
									<Home
										setIsLoggedIn={setIsLoggedIn}
										setUser={setUser}
										// handleSignOut={handleSignOut}
									/>
								}
							/>
							<Route path="*" element={<Navigate replace to="/home" />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
	)
}

export default App
