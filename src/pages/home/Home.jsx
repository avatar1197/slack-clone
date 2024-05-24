import React from "react"

import Sidebar from "../../components/sidebar/Sidebar" // Adjust the import path as necessary
import Header from "../../components/header/Header" // Ensure Header is also correctly imported if used
import "../../App.css"
// import Channel from './screens/channel/Channel'
// import Login from './screens/login/Login'
// import User from './screens/user/User'
// import Home from './screens/home/Home'
// import Add from './screens/add/Add'

function Home() {
	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Sidebar />
				<main>
					{/* Main content of the app could go here */}
					<p>Welcome to your Slack clone!</p>
				</main>
			</div>
		</div>
	)
}

export default Home
