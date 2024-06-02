import axios from 'axios';
import { API_URL } from '../constants/Constants';

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
      console.error("Login failed:", error.response ? error.response.data.errors : error);
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
      return response.data.data;
    } catch (error) {
      console.error("Failed to get users:", error.response ? error.response.data.errors : error);
      throw error;
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
      if (response.data.data) {
        return alert("Successfully sent a message!");
      } else {
        return alert("Cannot send message!");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },

  createChannel: async function (user, channel) {
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
        'Content-Type': 'application/json'
      };
      const response = await axios.post(`${API_URL}/channels`, channel, { headers });
      console.log('Response:', response); // Log the response for debugging
      if (response.status === 201) {
        return response.data;
      } else {
        console.error('Failed to create channel, status:', response.status, 'data:', response.data);
        throw new Error('Failed to create channel');
      }
    } catch (error) {
      console.error("Failed to create channel:", error.response ? error.response.data : error.message);
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
      const response = await axios.post(`${API_URL}/channels/add_member`, { id: channelId, member_id: userId }, { headers });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to add user to channel');
      }
    } catch (error) {
      console.error("Failed to add user to channel:", error.response ? error.response.data.errors : error);
      throw error;
    }
  }
};

export default UserService;