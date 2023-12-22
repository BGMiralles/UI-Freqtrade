import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';
import { allTechnicals } from '../../services/apiCalls';

export const UserTechnicalsTable = () => {
  const [technicalsData, setTechnicalsData] = useState([]);
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

  return (
    <div>
      <h1>Technicals Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {technicalsData.map((technical) => (
            <tr key={technical.id}>
              <td>{technical.name}</td>
              <td>{technical.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

