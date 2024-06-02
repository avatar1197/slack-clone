import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

function AddChannel({ user, onChannelCreated, handleClose }) {
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await UserService.getUsers(user);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName || selectedUserIds.length === 0) {
      alert('Please fill out all fields');
      return;
    }

    const channel = {
      name: channelName,
      user_ids: selectedUserIds,
    };

    try {
      const response = await UserService.createChannel(user, channel);
      console.log('Channel creation response:', response); // Log the response for debugging
      if (response) {
        onChannelCreated(response);
        setChannelName('');
        setSelectedUserIds([]);
        handleClose();
      } else {
        alert('Failed to create channel');
      }
    } catch (error) {
      console.error('Failed to create channel:', error);
      alert('Failed to create channel: ' + (error.response ? error.response.data : error.message));
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Channel Name:</label>
      <input
        type="text"
        className="input-style"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        required
      />
      <label>Select Users:</label>
      <select
        multiple
        className="input-style"
        value={selectedUserIds}
        onChange={(e) => setSelectedUserIds(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}
        required
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.email} (ID: {user.id})
          </option>
        ))}
      </select>
      <button type="submit">Create Channel</button>
    </form>
  );
}

export default AddChannel;