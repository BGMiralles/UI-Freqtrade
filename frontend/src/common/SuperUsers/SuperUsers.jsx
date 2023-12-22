import React, { useState, useEffect } from 'react';
import { allUsers, updateUserRole } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';

export const UsersTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRoleId, setEditedRoleId] = useState('');
  const datosRdxUser = useSelector(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allUsers(datosRdxUser.credentials);
        setUsersData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [datosRdxUser.credentials]); 

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const handleEdit = (userId) => {
    setEditingId(userId);
    const userToEdit = usersData.find((user) => user.id === userId);
    setEditedRoleId(userToEdit.role_id);
  };

  const handleSaveEdit = async (userId) => {
    try {
      await updateUserRole(userId, { role_id: editedRoleId }, datosRdxUser.credentials);

      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role_id: editedRoleId } : user
        )
      );

      setEditingId(null);
      setEditedRoleId('');
    } catch (error) {
      console.error('Error al guardar la edición:', error);
    }
  };

  return (
    <div>
      <h1>Users Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Role ID</th>
            <th>Is Active</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.nickname}</td>
              <td>{user.email}</td>
              <td>
                {user.id === editingId ? (
                  <input
                    type="text"
                    value={editedRoleId}
                    onChange={(e) => setEditedRoleId(e.target.value)}
                  />
                ) : (
                  user.role_id
                )}
              </td>
              <td>{user.is_active ? 'Yes' : 'No'}</td>
              <td>{formatDate(user.created_at)}</td>
              <td>{formatDate(user.updated_at)}</td>
              <td>
                {user.id === editingId ? (
                  <>
                    <button onClick={() => handleSaveEdit(user.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
