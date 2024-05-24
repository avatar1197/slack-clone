import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home" // Your home component

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
