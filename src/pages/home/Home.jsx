import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import SendMessage from "../../components/sendMessage/sendMessage"
import MessageHistory from "../../components/messageHistory/messageHistory"
import ChannelMessageHistory from "../../components/channelMessageHistory/ChannelMessageHistory";
import ChannelService from "../../services/ChannelService"
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
	const [channels, setChannels] = useState([]); 
	const [selectedChannel, setSelectedChannel] = useState(null); // Track the currently selected channel ***
	const [loadingChannels, setLoadingChannels] = useState(true); // State for loading channels ***
	const [channelError, setChannelError] = useState(null); // State for channel loading error ***

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

	// const handleAddReceiver = (newReceiver) => {
	// 	// Add new receiver if not already in list
	// 	if (!dms.some((dm) => dm.id === newReceiver.id)) {
	// 		setDms((prevDms) => {
	// 			const updatedDms = [...prevDms, newReceiver]
	// 			localStorage.setItem("dms", JSON.stringify(updatedDms)) // Update local storage
	// 			return updatedDms
	// 		})
	// 	}
	// }

	useEffect(() => { 
		const fetchChannels = async () => { 
		  try { 
			setLoadingChannels(true); // Start loading ***
			await ChannelService.getChannels(user, setChannels); 
			setLoadingChannels(false); // End loading ***
		  } catch (error) { 
			setLoadingChannels(false); // End loading ***
			setChannelError(error); // Set error state ***
		  } 
		};
	
		fetchChannels(); 
	  }, [user]);
	
	  const handleSelectChannel = (channelId) => { 
		console.log('Channel selected:', channelId); // debug 
		setSelectedChannel(channelId); // Update selected channel ***
	  };
	
	  const renderMainContent = () => { 
		if (loadingChannels) { // Check if channels are loading ***
		  return <div>Loading channels...</div>; 
		}
	
		if (channelError) { // Check if there was an error loading channels ***
		  return <div>Error loading channels: {channelError.message}</div>; 
		}
	
		if (selectedChannel) { // Check if a channel is selected ***
		  return ( 
			<> 
			  <ChannelMessageHistory user={user} channelId={selectedChannel} /> {/* Display message history for the selected channel *** */}
			  <SendMessage 
				user={user} 
				addReceiver={(receiver) => { 
				  if (!dms.some((dm) => dm.id === receiver.id)) { 
					setDms([...dms, receiver]); 
				  } 
				}} 
			  /> 
			</> 
		  ); 
		}
	
		return <div>Select a channel to view messages.</div>; // Default message when no channel is selected ***
	  };

	// const [channels, setChannels] = useState([]);
	// const [channelFlag, setChannelFlag] = useState(true);
	
	// useEffect(() => {
	// 	async function getChannels(){
	// 		await ChannelService.getChannels(user, setChannels);
	// 	}
	// 	if(channelFlag){
	// 		setChannelFlag(false);
	// 		getChannels();
	// 	}
	// }, [user, channelFlag]);

	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Sidebar
					dms={dms}
					channels={channels}
					onSelectDM={handleSelectDM}
					onSelectChannel={handleSelectChannel}
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
