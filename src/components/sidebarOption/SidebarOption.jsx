// SidebarOption.js

import React from "react"
import "./SidebarOption.css"

function SidebarOption({Icon, title, sub, id, addChannelOption, user, online}) {
	const selectChannel = () => {
		console.log(
			`Selecting ${id ? (user ? `user ${id}` : `channel ${id}`) : title}`
		)
	}

	const addChannel = () => {
		console.log("Attempting to add a channel")
	}

	const classNames = `sidebarOption ${online ? "online" : ""} ${
		sub ? "sub" : ""
	}`

	return (
		<div
			className={classNames}
			onClick={addChannelOption ? addChannel : selectChannel}
		>
			{Icon && <Icon className="sidebarOption__icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className="sidebarOption__channel">
					<span className="sidebarOption__hash">#</span>
					{title}
				</h3>
			)}
		</div>
	)
}

export default SidebarOption
