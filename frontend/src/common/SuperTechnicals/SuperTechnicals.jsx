import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';

export const TechnicalsTable = () => {
  const [technicalsData, setTechnicalsData] = useState([]);
  const datosRdxUser = useSelector(userData);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allTechnicals(datosRdxUser.credentials);
        setTechnicalsData(data);
      } catch (error) {
        console.error('Error fetching technicalsData:', error);
      }
    }
    fetchData();
  }, [datosRdxUser.credentials]);

  return (
    <div>
      <h1>Tabla de Datos</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

