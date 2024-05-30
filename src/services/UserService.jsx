import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
    login: async function (credentials) {
        if (!credentials.email || !credentials.password) {
            alert("Please enter both email and password");
            return null; // Early return to stop the login process
        }

        try {
            const response = await axios.post(`${API_URL}/auth/sign_in`, credentials);
            const { data, headers } = response;
            if (data && headers) {
                const userDetails = {
                    accessToken: headers["access-token"],
                    expiry: headers["expiry"],
                    client: headers["client"],
                    uid: headers["uid"],
                    id: data.data.id,
                };
                return userDetails;
            } else {
                throw new Error("No data received"); // Throw an error if no data is returned
            }
        } catch (error) {
            console.error(
                "Login failed:",
                error.response ? error.response.data.errors : error
            );
            alert("Login failed. Please check your credentials.");
            return null; // Return null to indicate failure
        }
    },

    getUsers: async function (user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };
            const response = await axios.get(`${API_URL}/users`, { headers });
            const users = response.data.data;
            return users.filter((user) => user.id >= 4980);
        } catch (error) {
            if (error.response.data.errors) {
                return alert("Cannot get users");
            }
        }
    },

    sendMsg: async function (user, info) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid,
            };
            const response = await axios.post(`${API_URL}/messages`, info, { headers });
            const { data } = response;
            if (data.data) {
                return alert("Successfully sent a message!");
            } else {
                return alert("Cannot send message!");
            }
        } catch (error) {
            console.log(error);
        }
    },

    createChannel: async function (user, channel) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid,
            };
            const response = await axios.post(`${API_URL}/channels`, channel, { headers });
            return response;
        } catch (error) {
            console.error("Failed to create channel:", error);
            throw error;
        }
    },

    addUserToChannel: async function (user, channelId, userId) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid,
            };
            const response = await axios.post(`${API_URL}/channels/${channelId}/add_user`, { user_id: userId }, { headers });
            return response;
        } catch (error) {
            console.error("Failed to add user to channel:", error);
            throw error;
        }
    },
};

export default UserService;