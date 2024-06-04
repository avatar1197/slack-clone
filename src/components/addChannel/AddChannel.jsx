import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

function AddChannel({ user, onChannelCreated, handleClose }) {
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

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

  // Handle checkbox change
  const handleCheckboxChange = (userId) => {
    setSelectedUserIds(prevSelectedUserIds =>
      prevSelectedUserIds.includes(userId)
        ? prevSelectedUserIds.filter(id => id !== userId)
        : [...prevSelectedUserIds, userId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName || selectedUserIds.length === 0) {
      setMessage('Please fill out all fields');
      return;
    }

    const channel = {
      name: channelName,
      user_ids: selectedUserIds,
    };

    try {
      const response = await UserService.createChannel(user, channel);
      console.log('Channel creation response:', response);
      if (response) {
        setMessage('Channel successfully created.');
        onChannelCreated(response);
        setChannelName('');
        setSelectedUserIds([]);
        handleClose();
      } else {
        setMessage('Failed to create channel.');
      }
    } catch (error) {
      console.error('Failed to create channel:', error);
      setMessage('Failed to create channel: ' + (error.response ? error.response.data : error.message));
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <div>
      {message && <div className="message">{message}</div>}
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
        <div className="checkbox-group" style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          {users.map(user => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <input
                type="checkbox"
                id={`user-${user.id}`}
                value={user.id}
                checked={selectedUserIds.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
                style={{ marginRight: '10px' }} // Space between checkbox and text
              />
              <label htmlFor={`user-${user.id}`}>
                {user.email} (ID: {user.id})
              </label>
            </div>
          ))}
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Create Channel</button>
      </form>
    </div>
  );
}

export default AddChannel;