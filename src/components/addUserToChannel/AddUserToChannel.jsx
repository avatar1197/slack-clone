import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

function AddUserToChannel({ user, channelId }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await UserService.getUsers(user);
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert('Please select a user');
      return;
    }

    try {
      const response = await UserService.addUserToChannel(user, selectedUserId, channelId);
      if (response.status === 200) {
        alert('User added to channel successfully4');
        setSelectedUserId('');
      } else {
        alert('Failed to add user to channel');
      }
    } catch (error) {
      console.error('Failed to add user to channel:', error);
      alert('Failed to add user to channel');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Select User:</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        required
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email} (ID: {user.id})
          </option>
        ))}
      </select>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserToChannel;