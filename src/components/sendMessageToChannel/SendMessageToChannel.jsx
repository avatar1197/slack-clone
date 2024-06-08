import React, { useState } from 'react';
import axios from 'axios';

function SendMessageToChannel({ user, channelId, onMessageSent }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message) {
      alert('Please enter a message');
      return;
    }

    const info = {
      receiver_id: channelId,
      receiver_class: 'Channel',
      body: message,
    };

    try {
      const headers = {
        'access-token': user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      await axios.post('http://206.189.91.54/api/v1/messages', info, { headers });
      setMessage(''); // Clear message input after sending
      alert('Message sent successfully!');
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Message:</label>
      <input
        type="text"
        className="input-style"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button type="submit" className="button-style">Send Message</button>
    </form>
  );
}

export default SendMessageToChannel;