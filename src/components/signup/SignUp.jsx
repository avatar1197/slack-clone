import {useState} from "react"
import UserService from "../../services/UserService"
import "./SignUp.css"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple" // Assuming Apple Icon is available, if not use another method to import it
import slackLogo from "../../assets/slacklogo.png"
import {Link} from "react-router-dom"
import {Button} from "@mui/material"

function SignUp(props) {
	const {setShowSignUp} = props
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [password_confirmation, setPasswordConfirmation] = useState()

	async function handleSubmit(event) {
		event.preventDefault()
		const info = {
			email,
			password,
			password_confirmation,
		}

		await UserService.signUp(info)
		await setShowSignUp(false)
	}

	function handleLogin() {
		setShowSignUp(false)
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
						onChange={(event) => setEmail(event.target.value)}
					></input>

					<input
						type="password"
						className="input-style"
						placeholder="password"
						onChange={(event) => setPassword(event.target.value)}
					></input>
					<label>last, confirm your password</label>
					<input
						type="password"
						className="input-style"
						placeholder="confirm password"
						onChange={(event) => setPasswordConfirmation(event.target.value)}
					></input>
					<div className="submit-div">
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Continue Sign Up
						</Button>
					</div>
				</form>
				<br />
				<p className="signup-prompt">
					Already Using Slack?{" "}
					<Link to="/">Signin to an existing workspace</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUp
