import React, { useState } from 'react';
import UserService from '../../services/UserService';

function AddChannelTest({ user }) {
  const [channelName, setChannelName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName) {
      alert('Please enter a channel name');
      return;
    }

    const channel = {
      name: channelName,
      is_private: false,
    };

    try {
      const response = await UserService.createChannel(user, channel);
      if (response.status === 201) {
        setChannelName('');
        alert('Channel created successfully!');
      } else {
        alert('Failed to create channel');
      }
    } catch (error) {
      console.error('Failed to create channel:', error);
      alert('Failed to create channel');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Channel Name:</label>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        required
      />
      <button type="submit">Create Channel</button>
    </form>
  );
}

export default AddChannelTest;