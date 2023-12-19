import React, { useState, useEffect } from "react";
import "./AllSuperAdmin.css"
import { superadminallusers, superadminappointments } from "../../services/apiCalls";
import { AppointmentTable, UserTable } from "../SuperAdminTables/SuperAdminTables";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";


export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const datosRdxUser = useSelector(userData);

  useEffect(() => {
    if(!datosRdxUser.credentials){
      navigate("/")
    }
  }, [datosRdxUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await superadminallusers(datosRdxUser.credentials);
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await superadminappointments(datosRdxUser.credentials);
        setAppointments(appointmentsResponse.data.data);
        console.log(appointmentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchUsers();
    fetchAppointments();
  }, []);

  return (
    <div>
      <UserTable users={users} />
      <AppointmentTable appointments={appointments} />
    </div>
  );
};

