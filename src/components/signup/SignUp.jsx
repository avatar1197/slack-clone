import {useState} from "react"
import {useNavigate} from "react-router-dom"
import UserService from "../../services/UserService"
import "./SignUp.css"
import slackLogo from "../../assets/slacklogo.png"
import {Link} from "react-router-dom"
import {Button} from "@mui/material"

function SignUp({setIsLoggedIn, setUser}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password_confirmation, setPasswordConfirmation] = useState("")
	const navigate = useNavigate() // For redirecting to another route

	async function handleSubmit(event) {
		event.preventDefault()
		const info = {
			email,
			password,
			password_confirmation,
		}

		try {
			// Attempt to sign up
			const signupResponse = await UserService.signUp(info)
			console.log("SignUp Success:", signupResponse)

			// If the signup is successful, attempt to log in automatically
			const loginResponse = await UserService.login({email, password})
			console.log("Login Success:", loginResponse)
			console.log("Update set User and set is logedin")
			setUser({
				accessToken: loginResponse.accessToken,
				expiry: loginResponse.expiry,
				client: loginResponse.client,
				uid: loginResponse.uid,
				id: loginResponse.id,
			})
			setIsLoggedIn(true)
			console.log("Update set User and set is logedin DONE")
			console.log("Navigating to /home...")

			// Navigate to home/dashboard page on successful login
			navigate("/home") // Ensure the route is correct as per your router setup
			console.log("Should be /home...")
		} catch (error) {
			// Log any errors and alert the user
			console.error("SignUp/Login Failed:", error)
			alert("SignUp/Login Failed: " + error.message)
		}
	}

	return (
		<div className="signup">
			<div className="signup__container">
				<img src={slackLogo} alt="Slack Logo" />
				<h1>First, enter your email and password</h1>
				<p>We suggest using the email address you use at Avion.</p>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						className="input-style"
						placeholder="name@work-email.com"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						type="password"
						className="input-style"
						placeholder="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<label>Last, confirm your password</label>
					<input
						type="password"
						className="input-style"
						placeholder="confirm password"
						value={password_confirmation}
						onChange={(event) => setPasswordConfirmation(event.target.value)}
					/>
					<div className="submit-div">
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Continue Sign Up
						</Button>
					</div>
				</form>
				<br />
				<p className="signup-prompt">
					Already Using Slack?{" "}
					<Link to="/">Sign in to an existing workspace</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUp
