import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import './getChannelHistory.css'; // Create and style this CSS file

function GetChannelHistory({ user, channelId }) {
  const [channelDetails, setChannelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchChannelDetails() {
      try {
        const headers = {
          'access-token': user.accessToken,
          expiry: user.expiry,
          client: user.client,
          uid: user.uid,
        };
        const response = await axios.get(`http://206.189.91.54/api/v1/channels/${channelId}`, { headers });
        setChannelDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch channel details:', error);
        setError(true);
        setLoading(false);
      }
    }

    if (channelId) {
      fetchChannelDetails();
    }
  }, [user, channelId]);

  const getAvatarColor = (isSender) => {
    return isSender ? deepPurple[500] : deepOrange[500];
  };

  if (loading) return <div>Loading channel details...</div>;
  if (error) return <div>Error fetching channel details. Please try again later.</div>;

  return (
    <div className="channel-history">
      {channelDetails ? (
        <>
          <h2>{channelDetails.name}</h2>
          <div className="message-history">
            {channelDetails.messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${
                  msg.sender.id === user.id ? 'sent' : 'received'
                }`}
              >
                <Avatar
                  className="avatar"
                  sx={{ bgcolor: getAvatarColor(msg.sender.id === user.id) }}
                >
                  {msg.sender.email[0].toUpperCase()}
                </Avatar>
                <div className="message-content">
                  <div className="message-info">
                    <span className="message-sender">
                      {msg.sender.id === user.id ? 'You' : msg.sender.email}
                    </span>
                    <span className="message-timestamp">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="message-text">{msg.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No channel details available.</div>
      )}
    </div>
  );
}

export default GetChannelHistory;