import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {Button} from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple" // Assuming Apple Icon is available, if not use another method to import it
import slackLogo from "../../assets/slacklogo.png"
import UserService from "../../services/UserService"
import {API_URL} from "../../constants/Constants"
import axios from "axios"
import "./Login.css"

function Login(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)
	const [showSignUp, setShowSignUp] = useState(false)

	useEffect(() => {
		if (user) {
			setIsLoggedIn(true)
			localStorage.setItem("user", JSON.stringify(user))
		}
	}, [user])
	// setting dependency for this useEffect
	// user should exist first before giving it to localStorage

	async function handleSubmit(event) {
		event.preventDefault()

		if (!email || !password) {
			return alert("Please enter both email and password")
		}
		try {
			const loginCredentials = {
				email,
				password,
			}

			const response = await axios.post(
				`${API_URL}/auth/sign_in`,
				loginCredentials
			)
			const {data, headers} = response
			if (data && headers) {
				const accessToken = headers["access-token"]
				const expiry = headers["expiry"]
				const client = headers["client"]
				const uid = headers["uid"]

				setUser({
					accessToken,
					expiry,
					client,
					uid,
					id: data.data.id,
				})

				props.setIsLoggedIn(true) // Assuming you pass setIsLoggedIn as a prop from App.js
			}
		} catch (error) {
			console.error(
				"Login failed:",
				error.response ? error.response.data.errors : error
			)
			alert("Login failed. Please check your credentials.")
		}
	}

	const handleGoogleSignIn = () => {
		console.log("Google Sign In Clicked") // Dummy handler
	}

	const handleAppleSignIn = () => {
		console.log("Apple Sign In Clicked") // Dummy handler
	}

	const handleEmailSignIn = (event) => {
		event.preventDefault()
		console.log("Email Sign In with", email) // Handle Email Sign In
	}

	return (
		<div className="login">
			<div className="login__container">
				<img src={slackLogo} alt="Slack Logo" />
				<h1>Sign in to Slack</h1>
				<p>We suggest using the email address you use at Avion.</p>
				<Button
					startIcon={<GoogleIcon className="google-btn" />}
					variant="outlined"
					fullWidth
					onClick={handleGoogleSignIn}
				>
					Sign In With Google
				</Button>
				<Button
					startIcon={<AppleIcon className="apple-btn" />}
					variant="outlined"
					fullWidth
					onClick={handleAppleSignIn}
				>
					Sign In With Apple
				</Button>
				<div className="login__or">OR</div>
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
					<div className="submit-div">
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Sign In With Email
						</Button>
					</div>
				</form>
				<p className="signup-prompt">
					New to Slack? <Link to="/signup">Create an account</Link>
				</p>
			</div>
		</div>
	)
}

export default Login
