import React, { useEffect, useState } from "react";
import { SuperStrategies } from "../../common/SuperStrategies/SuperStrategies";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  allTechnicals,
  allTimeFrames,
  allUsers,
  superAdminStrategies,
} from "../../services/apiCalls";

export const ViewSuperStrategy = () => {
  const datosRdxUser = useSelector(userData);
  const [strategies, setStrategies] = useState([]);
  const [allTechnicalsData, setAllTechnicalsData] = useState([]);
  const [allTimeFramesData, setAllTimeFramesData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    }
  }, [datosRdxUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strategiesResponse = await superAdminStrategies(
          datosRdxUser.credentials
        );
        setStrategies(strategiesResponse.data.data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }

      try {
        const responseTechnicals = await allTechnicals(datosRdxUser.credentials);
        setAllTechnicalsData(responseTechnicals.data.data);
      } catch (error) {
        console.error("Error fetching allTechnicals:", error);
      }

      try {
        const responseTimeFrames = await allTimeFrames(datosRdxUser.credentials);
        setAllTimeFramesData(responseTimeFrames.data);
      } catch (error) {
        console.error("Error fetching allTimeFrames:", error);
      }

      try {
        const responseUsers = await allUsers(datosRdxUser.credentials);
        setAllUsersData(responseUsers.data.data);
      } catch (error) {
        console.error("Error fetching allUsers:", error);
      }
    };

    fetchData();
  }, [datosRdxUser.credentials]);

  return (
    <div>
      <h1>Strategies</h1>
      <SuperStrategies
        data={strategies}
        allTechnicalsData={allTechnicalsData}
        allTimeFramesData={allTimeFramesData}
        allUsersData={allUsersData}
      />
    </div>
  );
};
