import React, {useState, useEffect} from "react"
import "./Sidebar.css"
import {Modal, Box, Typography, Button} from "@mui/material"
import SidebarOption from "../sidebarOption/SidebarOption"
import CreateIcon from "@mui/icons-material/Create"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import InsertCommentIcon from "@mui/icons-material/InsertComment"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import AddIcon from "@mui/icons-material/Add"
import SendMessage from "../sendMessage/sendMessage"
import AddChannel from "../addChannel/AddChannel"
import AddUserToChannel from "../addUserToChannel/AddUserToChannel"
import SendMessageToChannel from "../sendMessageToChannel/SendMessageToChannel"

// import SendMessagetest from "../sendMessage/sendMessagetest"
// import LoadUsers from "../loadUsers/LoadUsers"

function Sidebar({handleLogout, onSelectDM}) {
	//logged in user data
	const user = JSON.parse(localStorage.getItem("user"))

	//sidebar display name, "" by default
	const [userDetails, setUserDetails] = useState({
		displayName: "",
	})

	//direct messages
	// contains list of receivers from the sendmessage compoent
	const [dms, setDms] = useState(() =>
		JSON.parse(localStorage.getItem("dms") || "[]")
	)

	//modal (for send message) setting
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	// const [selectedUserId, setSelectedUserId] = useState("")
	// const handleSelectUser = (userId) => {
	// 	setSelectedUserId(userId)
	// }

	//parsing loggedin user uid for the display name
	useEffect(() => {
		const storedUserData = JSON.parse(localStorage.getItem("user"))
		if (storedUserData && storedUserData.uid) {
			const displayName = storedUserData.uid.split("@")[0]
			setUserDetails({
				displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
			})
		} else {
			setUserDetails({displayName: "Null"}) // Ensure displayName is reset when user logs out
		}
	}, [])

	// Update local storage whenever DMs change
	useEffect(() => {
		localStorage.setItem("dms", JSON.stringify(dms))
	}, [dms])

	const addReceiver = (newReceiver) => {
		setDms((prevDms) => {
			const existing = prevDms.find((dm) => dm.id === newReceiver.id)
			if (!existing) {
				const updatedDms = [...prevDms, newReceiver]
				localStorage.setItem("dms", JSON.stringify(updatedDms))
				return updatedDms
			}
			return prevDms
		})
	}

	// Initial load of channels from local storage or setting default channels
	const [channels, setChannels] = useState(
		() =>
			JSON.parse(localStorage.getItem("channels")) || [
				{name: "General", id: "general", type: "public"},
				{name: "Tech Talk", id: "tech_talk", type: "private"},
			]
	)

	// useEffect to sync channels with local storage whenever they change
	useEffect(() => {
		console.log("Channels updated: ", channels)
		localStorage.setItem("channels", JSON.stringify(channels))
	}, [channels])

	const handleChannelCreated = (newChannel) => {
		setChannels((prevChannels) => [...prevChannels, newChannel])
	}

	//channel states and modal settings
	const [openAddChannel, setOpenAddChannel] = useState(false)
	const handleOpenAddChannel = () => setOpenAddChannel(true)
	const handleCloseAddChannel = () => setOpenAddChannel(false)

	// Styles for the modal content
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}

	const dummyClick = () => {
		console.log("Clicked!")
	}

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div className="sidebar__info">
					<h2>Avion School</h2>
					<h3>
						<FiberManualRecordIcon />
						{userDetails.displayName}
					</h3>
				</div>
				{/* initiate send message */}
				<CreateIcon onClick={handleOpen} style={{cursor: "pointer"}} />
				{/* Modal setup */}
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="send-message-modal-title"
					aria-describedby="send-message-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="send-message-modal-title"
							variant="h6"
							component="h2"
						>
							New Message
						</Typography>
						<SendMessage
							user={user}
							addReceiver={addReceiver}
							handleClose={handleClose}
						/>
						{/* <LoadUsers
							user={user}
							selectedUserId={selectedUserId}
							onSelectUser={handleSelectUser}
						/>
						{selectedUserId && (
							<SendMessagetest user={user} receiverId={selectedUserId} />
						)} */}
					</Box>
				</Modal>
			</div>
			<div className="sidebar__options">
				<SidebarOption
					Icon={InsertCommentIcon}
					title="Threads"
					onClick={dummyClick}
				/>
				<SidebarOption
					Icon={AlternateEmailIcon}
					title="Mentions & Reactions"
					onClick={dummyClick}
				/>
				<SidebarOption Icon={MoreVertIcon} title="More" onClick={dummyClick} />
				<hr />
				<SidebarOption
					Icon={ArrowDropDownIcon}
					title="Channels"
					onClick={dummyClick}
				/>
				<hr />
				{channels.map((channel) => (
					<SidebarOption
						Icon={LockOutlinedIcon}
						title={channel.name}
						id={channel.id}
						key={channel.id}
						sub="sidebarOption__sub"
						onClick={() => console.log("Channel selected:", channel.name)}
					/>
				))}
				<SidebarOption
					Icon={AddIcon}
					title="Add Channel"
					sub="sidebarOption__sub"
					onClick={handleOpenAddChannel}
				/>
				<Modal
					open={openAddChannel}
					onClose={handleCloseAddChannel}
					aria-labelledby="add-channel-modal-title"
					aria-describedby="add-channel-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="add-channel-modal-title"
							variant="h6"
							component="h2"
						>
							Add New Channel
						</Typography>
						<AddChannel
							user={user}
							onChannelCreated={handleChannelCreated}
							handleCloseAddChannel={handleCloseAddChannel}
						/>
					</Box>
				</Modal>
				<hr />
				<SidebarOption
					Icon={ArrowDropDownIcon}
					title="Direct Messages"
					onClick={dummyClick}
				/>
				<hr />
				{dms.map((dm) => (
					<SidebarOption
						key={dm.id}
						Icon={FiberManualRecordIcon}
						title={dm.email}
						id={dm.id}
						sub="sidebarOption__sub sidebarOption__color"
						onClick={() => onSelectDM(dm.id)}
					/>
				))}
			</div>
			<button className="sidebar__logout" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}

export default Sidebar
