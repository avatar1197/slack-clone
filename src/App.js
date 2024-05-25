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
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				) : (
					<Routes>
						<Route
							path="/"
							element={<Home user={user} handleSignOut={handleSignOut} />}
						/>
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				)}
			</div>
		</Router>
	)
}

export default App
