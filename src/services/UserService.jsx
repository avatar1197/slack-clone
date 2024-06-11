import axios from "axios"
import {API_URL} from "../constants/Constants"

const UserService = {
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
	signUp: async function (info) {
		if (info.password !== info.password_confirmation) {
			return alert("Passwords don't match!")
			alert("Passwords don't match!")
			return Promise.reject("Passwords don't match") // Reject the promise here
		}

		try {
			const response = await axios.post(`${API_URL}/auth/`, info)
			const {data} = response
			if (data.data) {
				return alert("Account creation successful!")
			}
			// const {data} = response
			return response.data // Return the whole response data
			// if (data.data) {
			// 	return alert("Account creation successful!")
			// }
		} catch (error) {
			if (error.response.data.errors) {
				return alert("Unable to create this account.")
			}
			alert(
				"Unable to create this account: " +
					(error.response?.data?.errors?.join(", ") || "Unknown Error")
			)
			return Promise.reject(error) // Reject the promise on error
		}
	},

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
			console.error(
				"Failed to get users:",
				error.response ? error.response.data.errors : error
			)
			throw error
		}
	},

	sendMsg: async function (user, info) {
		try {
			const headers = {
				"access-token": user.accessToken,
				client: user.client,
				expiry: user.expiry,
				uid: user.uid,
			}
			const response = await axios.post(`${API_URL}/messages`, info, {headers})
			if (response.data.data) {
				alert("Successfully sent a message!")
				return response.data
			} else {
				alert("Cannot send message!")
				return null
			}
		} catch (error) {
			console.error("Failed to send message:", error)
			throw error
		}
	},

	createChannel: async function (user, channel) {
		try {
			const headers = {
				"access-token": user.accessToken,
				client: user.client,
				expiry: user.expiry,
				uid: user.uid,
				// 'Content-Type': 'application/json'
			}
			const response = await axios.post(`${API_URL}/channels`, channel, {
				headers,
			})
			return response.data
			// if (response.status === 201) {
			//   return response.data;
			// } else {
			//   console.error('Failed to create channel, status:', response.status, 'data:', response.data);
			//   throw new Error('Failed to create channel');
			// } c
		} catch (error) {
			console.error(
				"Failed to create channel:",
				error.response ? error.response.data : error.message
			)
			throw error
		}
	},

	addUserToChannel: async function (user, channelId, userId) {
		try {
			const headers = {
				"access-token": user.accessToken,
				client: user.client,
				expiry: user.expiry,
				uid: user.uid,
			}
			const response = await axios.post(
				`${API_URL}/channels/add_member`,
				{id: channelId, member_id: userId},
				{headers}
			)
			if (response.status === 200) {
				return response.data
			} else {
				throw new Error("Failed to add user to channel")
			}
		} catch (error) {
			console.error(
				"Failed to add user to channel:",
				error.response ? error.response.data.errors : error
			)
			throw error
		}
	},
}

export default UserService
