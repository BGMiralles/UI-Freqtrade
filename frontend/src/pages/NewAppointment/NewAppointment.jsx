import React, { useEffect } from "react";
import "./NewAppointment.css";
import { NewAppointment } from "../../common/TakeAppointment/TakeAppointment";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const NewAppoint = () => {
  const datosRdxUser = useSelector(userData);
  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    }
  }, [datosRdxUser]);

  return <NewAppointment />;
};
