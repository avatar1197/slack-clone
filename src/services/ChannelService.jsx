import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
    getChannels: async function(user, setChannels){
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            };

            const response = await axios.get(`${API_URL}/channels`, { headers });
            const { data } = response;
            if (data) {
                setChannels(data.data);
            }
        } catch (error) {
            console.error("Cannot get channels:", error.response ? error.response.data.errors : error);
            alert("Cannot get channels!");
        }
    }
};

export default ChannelService;