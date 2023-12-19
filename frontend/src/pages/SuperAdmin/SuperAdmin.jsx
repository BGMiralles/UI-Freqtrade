import React, { useEffect } from "react";
import "./SuperAdmin.css";
import { Dashboard } from "../../common/AllSuperAdmin/AllSuperAdmin";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const SuperAdmin = () => {
  const datosRdxUser = useSelector(userData);
  useEffect(() => {
    if (!datosRdxUser.credentials || datosRdxUser.data.role !== "super_admin") {
      navigate("/");
    }
  }, [datosRdxUser]);

  return <Dashboard />;
};
