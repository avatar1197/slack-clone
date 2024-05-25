import {useState} from "react"
import UserService from "../../services/UserService"
import "./SignUp.css"

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
		<div className="sign-up">
			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<input
					type="email"
					className="input-style"
					onChange={(event) => setEmail(event.target.value)}
				></input>
				<label>Password:</label>
				<input
					type="password"
					className="input-style"
					onChange={(event) => setPassword(event.target.value)}
				></input>
				<label>Password Confirmation:</label>
				<input
					type="password"
					className="input-style"
					onChange={(event) => setPasswordConfirmation(event.target.value)}
				></input>
				<button type="submit">Sign Up</button>
			</form>
			<br />
			<button onClick={handleLogin}> I have an account </button>
		</div>
	)
}

export default SignUp
