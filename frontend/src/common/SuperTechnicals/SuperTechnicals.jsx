import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';
import { allTechnicals, createTechnical, deleteTechnical, updateTechnical } from '../../services/apiCalls';

export const TechnicalsTable = () => {
  const [technicalsData, setTechnicalsData] = useState([]);
  const [editedTechnical, setEditedTechnical] = useState(null);
  const [newTechnical, setNewTechnical] = useState({ name: '', description: '' });
  const datosRdxUser = useSelector(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allTechnicals(datosRdxUser.credentials);
        setTechnicalsData(response.data.data);
      } catch (error) {
        console.error('Error fetching technicalsData:', error);
      }
    };

    fetchData();
  }, [datosRdxUser.credentials]);

  const handleInputChange = (field, value) => {
    if (editedTechnical) {
      setEditedTechnical({ ...editedTechnical, [field]: value });
    } else {
      setNewTechnical({ ...newTechnical, [field]: value });
    }
  };

  const handleEdit = (technical) => {
    setEditedTechnical({ ...technical });
  };

  const handleCancelEdit = () => {
    setEditedTechnical(null);
  };

  const handleSaveEdit = async () => {
    try {
      await updateTechnical(editedTechnical.id, editedTechnical, datosRdxUser.credentials);

      const response = await allTechnicals(datosRdxUser.credentials);
      setTechnicalsData(response.data.data);
      setEditedTechnical(null);
    } catch (error) {
      console.error('Error saving edited technical:', error);
    }
  };

  const handleCreateNew = async () => {
    try {
      await createTechnical(newTechnical, datosRdxUser.credentials);

      const response = await allTechnicals(datosRdxUser.credentials);
      setTechnicalsData(response.data.data);
      setNewTechnical({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating new technical:', error);
    }
  };

  const handleDelete = async (technicalId) => {
    try {
      await deleteTechnical(technicalId, datosRdxUser.credentials);

      const response = await allTechnicals(datosRdxUser.credentials);
      setTechnicalsData(response.data.data);
    } catch (error) {
      console.error('Error deleting technical:', error);
    }
  };

  return (
    <div>
      <h1>Tabla de Datos</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicalsData.map((technical) => (
            <tr key={technical.id}>
              <td>
                {editedTechnical && editedTechnical.id === technical.id ? (
                  <input
                    type="text"
                    value={editedTechnical.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  technical.name
                )}
              </td>
              <td>
                {editedTechnical && editedTechnical.id === technical.id ? (
                  <input
                    type="text"
                    value={editedTechnical.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                ) : (
                  technical.description
                )}
              </td>
              <td>
                {editedTechnical && editedTechnical.id === technical.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(technical)}>Edit</button>
                )}
                <button onClick={() => handleDelete(technical.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Name"
                value={newTechnical.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Description"
                value={newTechnical.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleCreateNew}>Crear Nuevo Indicador</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
