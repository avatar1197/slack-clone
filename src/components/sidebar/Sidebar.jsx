import "./Sidebar.css"
import SidebarOption from "../sidebarOption/SidebarOption"
import CreateIcon from "@mui/icons-material/Create"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import InsertCommentIcon from "@mui/icons-material/InsertComment"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import AddIcon from "@mui/icons-material/Add"

function Sidebar() {
	// Static data for display
	const user = {displayName: "John Doe"}
	const channels = [
		{name: "General", guid: "general", type: "public"},
		{name: "Tech Talk", guid: "tech_talk", type: "private"},
	]
	const dms = [{name: "Jane Smith", uid: "jane_smith", status: "online"}]

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div className="sidebar__info">
					<h2>Avion School</h2>
					<h3>
						<FiberManualRecordIcon />
						{user.displayName.split(" ")[0]}
					</h3>
				</div>
				<CreateIcon />
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
						Icon={FiberManualRecordIcon}
						title={dm.name}
						id={dm.uid}
						key={dm.uid}
						sub="sidebarOption__sub sidebarOption__color"
						user
						online={dm.status === "online" ? "isOnline" : ""}
					/>
				))}
			</div>
			<button className="sidebar__logout">Logout</button>
		</div>
	)
}

export default Sidebar
