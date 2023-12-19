import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { myappointments, deletemyappointments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { Print } from "../../common/AppointmentTable/AppointmentTable";
import { userData } from "../userSlice";

export const Appointment = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [appointments, setAppointments] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await myappointments(datosRdxUser.credentials);
          if (isMounted) {
            setAppointments(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      if (appointments.length === 0) {
        fetchData();
      }
    }

    return () => {
      setIsMounted(false);
    };
  }, [datosRdxUser, navigate, isMounted, appointments]);

  return (
    <div>
      <h2>Tabla de Citas</h2>
      <Print appo={appointments} setAppointments={setAppointments} />
    </div>
  );
};
