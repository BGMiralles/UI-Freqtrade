import React, { useEffect, useState } from 'react';
import { SuperStrategies } from '../../common/SuperStrategies/SuperStrategies';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { superAdminStrategies } from '../../services/apiCalls';

export const ViewSuperStrategy = () => {
    const datosRdxUser = useSelector(userData);
    const [strategies, setStrategies] = useState([]);

    useEffect(() => {
        if(!datosRdxUser.credentials){
          navigate("/")
        }
      }, [datosRdxUser]);
    
      useEffect(() => {
        const fetchStrategies = async () => {
          try {
            const strategiesResponse = await superAdminStrategies(datosRdxUser.credentials);
            setStrategies(strategiesResponse.data.data);
          } catch (error) {
            console.error("Error fetching strategies:", error);
          }
        };
    
        fetchStrategies();
      }, []);

  return (
    <div>
      <h1>Strategies</h1>
      <SuperStrategies data={strategies} />
    </div>
  );
};

