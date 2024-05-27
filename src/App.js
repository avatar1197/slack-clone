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
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)
	const [isLoggedIn, setIsLoggedIn] = useState(!!user) // Derived directly from user existence

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user)) // Always sync user to localStorage
		setIsLoggedIn(!!user) // Update login state based on user state
	}, [user])

	const handleSignOut = () => {
		setUser(null) // This will update the user state to null and trigger useEffect
		localStorage.removeItem("user") // Ensure local storage is cleared
	}

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
								element={<Home user={user} handleSignOut={handleSignOut} />}
							/>
							<Route path="*" element={<Navigate replace to="/home" />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
		// <Router>
		// 	<div className="App">
		// 		<Routes>
		// 			<Route
		// 				path="/"
		// 				element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
		// 			/>
		// 			<Route
		// 				path="/signup"
		// 				element={<SignUp setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
		// 			/>
		// 			<Route
		// 				path="/home"
		// 				element={<Home user={user} handleSignOut={handleSignOut} />}
		// 			/>
		// 			<Route
		// 				path="*"
		// 				element={<Navigate replace to={isLoggedIn ? "/home" : "/"} />}
		// 			/>
		// 		</Routes>
		// 	</div>
		// </Router>
	)
}

export default App
