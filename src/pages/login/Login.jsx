import "./Login.css"
import {Button} from "@mui/material" // Note: Updated import from '@material-ui/core' to '@mui/material'
import {useState} from "react"
import slackLogo from "../../assets/slacklogo.png"

function Login() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const signIn = () => {
		setLoading(true)
		// Simulate an API call with a timeout
		setTimeout(() => {
			const fakeUser = {
				uid: "12345",
				displayName: "John Doe",
				photoURL: "https://via.placeholder.com/150",
			}
			localStorage.setItem("user", JSON.stringify(fakeUser))
			setLoading(false)
			window.location.href = "/" // Redirects to the homepage after "login"
		}, 1000)
	}

	return (
		<div className="login">
			<div className="login__container">
				<img src={slackLogo} alt="Slack Logo" />

				<h4>Sign in to Slack</h4>
				<p>We suggest using the email address you use at work</p>
				{error && <p className="login__error">{error}</p>}
				<Button
					variant="contained"
					color="primary"
					onClick={signIn}
					disabled={loading}
				>
					{!loading ? "Sign In With Google" : "Loading..."}
				</Button>
			</div>
		</div>
	)
}

export default Login
