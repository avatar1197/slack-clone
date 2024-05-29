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

	const handleSelectDM = (id) => {
		console.log("DM selected:", id) // debug
		setSelectedDM(id)
	}

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
				<Sidebar
					dms={dms}
					onSelectDM={handleSelectDM}
					handleLogout={handleLogout}
				/>

				<div className="main-content">
					{/* <SendMessage
						user={user}
						addReceiver={(receiver) => {
							if (!dms.some((dm) => dm.id === receiver.id)) {
								setDms([...dms, receiver])
							}
						}}
					/> */}
					{selectedDM && <MessageHistory user={user} receiverId={selectedDM} />}
				</div>
			</div>
		</div>
	)
}

export default Home
