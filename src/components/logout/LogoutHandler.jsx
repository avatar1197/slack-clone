import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

function LogoutHandler({setUser, setIsLoggedIn}) {
	const navigate = useNavigate()

	useEffect(() => {
		setUser(null) // Clear the user state
		setIsLoggedIn(false) // Update logged in status
		navigate("/") // Redirect to login
		console.log("debugger")
	}, [])

	return null // This component does not render anything
}

export default LogoutHandler
