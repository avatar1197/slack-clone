import React, { useState } from 'react';
import UserService from '../../services/UserService';

function SendMessageToChannelTest({ user, channelId }) {
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
      await UserService.sendMsg(user, info);
      setMessage(''); // Clear message input after sending
      alert('Message sent successfully!');
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
      <button type="submit">Send Message</button>
    </form>
  );
}

export default SendMessageToChannelTest;