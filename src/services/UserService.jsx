import {API_URL} from "../constants/Constants"
import axios from "axios"

const UserService = {
	//object method for loging in
	login: async function (credentials) {
		if (!credentials.email || !credentials.password) {
			alert("Please enter both email and password")
			return null // Early return to stop the login process
		}

		try {
			const response = await axios.post(`${API_URL}/auth/sign_in`, credentials)
			const {data, headers} = response
			if (data && headers) {
				const userDetails = {
					accessToken: headers["access-token"],
					expiry: headers["expiry"],
					client: headers["client"],
					uid: headers["uid"],
					id: data.data.id,
				}
				return userDetails
			} else {
				throw new Error("No data received") // Throw an error if no data is returned
			}
		} catch (error) {
			console.error(
				"Login failed:",
				error.response ? error.response.data.errors : error
			)
			alert("Login failed. Please check your credentials.")
			return null // Return null to indicate failure
		}
	},
	// Object method for getting users
	getUsers: async function (user) {
		try {
			const headers = {
				"access-token": user.accessToken,
				expiry: user.expiry,
				client: user.client,
				uid: user.uid,
			}
			const response = await axios.get(`${API_URL}/users`, {headers})
			const users = response.data.data
			return users.filter((user) => user.id >= 4980)
		} catch (error) {
			if (error.response.data.errors) {
				return alert("Cannot get users")
			}
		}
	},

	//object method for sending message
	sendMsg: async function (user, info) {
		try {
			const headers = {
				"access-token": user.accessToken,
				client: user.client,
				expiry: user.expiry,
				uid: user.uid,
			}
			const response = await axios.post(`${API_URL}/messages`, info, {headers})
			const {data} = response
			if (data.data) {
				return alert("Successfully sent a message!")
			} else {
				return alert("Cannot send message!")
			}
		} catch (error) {
			console.log(error)
		}
	},

	// Object method for getting messages
	// getMessage : async function (user) {
	// 	try {
	// 		const headers = {
	// 			"access-token": user.accessToken,
	// 			expiry: user.expiry,
	// 			client: user.client,
	// 			uid: user.uid,
	// 		}
	// 		const response = await axios.get(`${API_URL}/messages?receiver_id=${}&receiver_class=User`, {headers})
	// 		const users = response.data.data
	// 		return users.filter((user) => user.id >= 4980)
	// 	} catch (error) {
	// 		if (error.response.data.errors) {
	// 			return alert("Cannot get users")
	// 		}
	// 	}
	// },

	signUp: async function (info) {
		if (info.password !== info.password_confirmation) {
			alert("Passwords don't match!")
			return Promise.reject("Passwords don't match") // Reject the promise here
		}

		try {
			const response = await axios.post(`${API_URL}/auth/`, info)
			// const {data} = response
			return response.data // Return the whole response data
			// if (data.data) {
			// 	return alert("Account creation successful!")
			// }
		} catch (error) {
			alert(
				"Unable to create this account: " +
					(error.response?.data?.errors?.join(", ") || "Unknown Error")
			)
			return Promise.reject(error) // Reject the promise on error
		}
	},
}

export default UserService
