import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import SendMessage from "../../components/sendMessage/sendMessage"
import MessageHistory from "../../components/messageHistory/messageHistory"
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

	const [selectedDM, setSelectedDM] = useState(null)
	const [dms, setDms] = useState([]) // contains list of receivers from the sendmessage compoent

	// Load DMs from local storage when component mounts
	useEffect(() => {
		const loadedDMs = JSON.parse(localStorage.getItem("dms"))
		if (loadedDMs) {
			setDms(loadedDMs)
		}
	}, [])

	// Update local storage whenever DMs change
	useEffect(() => {
		localStorage.setItem("dms", JSON.stringify(dms))
	}, [dms])

	const handleAddReceiver = (newReceiver) => {
		// Add new receiver if not already in list
		if (!dms.some((dm) => dm.id === newReceiver.id)) {
			setDms((prevDms) => {
				const updatedDms = [...prevDms, newReceiver]
				localStorage.setItem("dms", JSON.stringify(updatedDms)) // Update local storage
				return updatedDms
			})
		}
	}

	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Sidebar dms={dms} onSelectDM={setSelectedDM} handleLogout={() => {}} />
				{/* {selectedDM && <MessageHistory user={user} receiverId={selectedDM} />} */}
				<SendMessage user={user} addReceiver={handleAddReceiver} />
				{selectedDM && <MessageHistory user={user} receiverId={selectedDM} />}

				{/* <main className="home-main">
					<p>Welcome to your Slack clone!</p>
					{user && (
						<>
							<SendMessage user={user} />
							<MessageHistory user={user} receiverId="5007" /> // Assuming
							'5007' or replace dynamically as needed
						</>
					)} </main>*/}
			</div>
		</div>
	)
}

export default Home
