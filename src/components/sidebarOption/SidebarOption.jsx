// SidebarOption.jsx
import React from "react"
import "./SidebarOption.css"

function SidebarOption({
	Icon,
	title,
	sub,
	id,
	addChannelOption,
	user,
	online,
	onClick,
}) {
	return (
		<div className="sidebarOption" onClick={() => onClick(id)}>
			{Icon && <Icon className="sidebarOption__icon" />}
			<h3>{title}</h3>
		</div>
	)
}

export default SidebarOption
