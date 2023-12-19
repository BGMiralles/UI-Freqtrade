import React, { useEffect, useState } from "react";
import "./MyAppointments.css";
import { useSelector } from "react-redux";
import {
  artistappointments,
  deletemyappointments,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { Works } from "../../common/ArtistAppointments/ArtistAppointments";
import { userData } from "../userSlice";

export const MyAppointments = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [appointments, setAppointments] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (
      !datosRdxUser.credentials ||
      (datosRdxUser.data.role !== "admin" &&
        datosRdxUser.data.role !== "super_admin")
    ) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await artistappointments(datosRdxUser.credentials);
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
      <Works appo={appointments} setAppointments={setAppointments} />
    </div>
  );
};
