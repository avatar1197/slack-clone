import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

function AddUserToChannel({ user, channelId }) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
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

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds(prevSelectedUserIds =>
      prevSelectedUserIds.includes(userId)
        ? prevSelectedUserIds.filter(id => id !== userId)
        : [...prevSelectedUserIds, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUserIds.length === 0) {
      alert('Please select at least one user');
      return;
    }

    try {
      const response = await UserService.addUsersToChannel(user, selectedUserIds, channelId);
      if (response.status === 200) {
        alert('Users added to channel successfully');
        setSelectedUserIds([]);
      } else {
        alert('Failed to add users to channel');
      }
    } catch (error) {
      console.error('Failed to add users to channel:', error);
      alert('Failed to add users to channel: ' + (error.response ? error.response.data : error.message));
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Users</button>
      </form>
    </div>
  );
}

export default AddUserToChannel;