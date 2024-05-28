import React, {useState, useEffect} from "react"
import {Axios} from "axios"
import SidebarOption from "../sidebarOption/SidebarOption"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

function fetchMessage() {
	const [dms, setDms] = useState([])

	useEffect(() => {
		async function fetchDMs(user) {
			try {
				const headers = {
					"access-token": user.accessToken,
					client: user.client,
					expiry: user.expiry,
					uid: user.uid,
				}
				const ReceiverId = user.id
				const response = await axios.get(
					`${API_URL}/messages?receiver_id=${ReceiverId}&receiver_class=User`,
					{headers}
				)
				const data = response.data
			} catch (error) {
				console.log("Failed to ferch messages:", error)
			}
		}

		// Fetch user details from localStorage and call fetchDMs
		const storedData = localStorage.getItem("user") // This should match how you store the user data
		if (storedData) {
			const user = JSON.parse(storedData)
			if (user && user.accessToken && user.id) {
				fetchDMs(user)
			}
		}
	}, [])

	return (
		<>
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
		</>
	)
}

export default fetchMessage
