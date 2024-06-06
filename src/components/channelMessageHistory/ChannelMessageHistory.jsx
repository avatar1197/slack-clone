import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetChannelHistory.css';

function ChannelMessageHistory({ user, channelId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const headers = {
          'access-token': user.accessToken,
          expiry: user.expiry,
          client: user.client,
          uid: user.uid,
        };
        const response = await axios.get(`http://206.189.91.54/api/v1/channels/${channelId}/messages`, { headers });
        setMessages(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user, channelId]);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error loading messages. Please try again later.</div>;

  return (
    <div className="channel-history">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-item ${message.sender_id === user.id ? 'sent' : 'received'}`}
        >
          <div className="message-content">
            <div className="message-info">
              <span>{message.sender.email}</span>
              <span>{new Date(message.created_at).toLocaleString()}</span>
            </div>
            <div className="message-text">{message.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChannelMessageHistory;