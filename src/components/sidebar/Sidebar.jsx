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

	// const handleSelectDM = (id) => {
	// 	onSelectDM(id)
	// }

	//dummy channels
	const channels = [
		{name: "General", guid: "general", type: "public"},
		{name: "Tech Talk", guid: "tech_talk", type: "private"},
	]

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
							Send a Message
						</Typography>

						<SendMessage
							user={user}
							addReceiver={addReceiver}
							handleClose={handleClose}
						/>
					</Box>
				</Modal>
			</div>
			<div className="sidebar__options">
				<SidebarOption Icon={InsertCommentIcon} title="Threads" />
				<SidebarOption Icon={AlternateEmailIcon} title="Mentions & Reactions" />
				<SidebarOption Icon={MoreVertIcon} title="More" />
				<hr />
				<SidebarOption Icon={ArrowDropDownIcon} title="Channels" />
				<hr />
				{channels.map((channel) => (
					<SidebarOption
						Icon={channel.type === "private" ? LockOutlinedIcon : null}
						title={channel.name}
						id={channel.guid}
						key={channel.guid}
						sub="sidebarOption__sub"
					/>
				))}
				<SidebarOption
					Icon={AddIcon}
					title="Add Channel"
					sub="sidebarOption__sub"
					addChannelOption
				/>
				<hr />
				<SidebarOption Icon={ArrowDropDownIcon} title="Direct Messages" />
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
