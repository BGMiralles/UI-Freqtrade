import React, { useState, useEffect } from "react";
import "./TakeAppointment.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import {
  bringTattooArtists,
  bringTattoo,
  newAppointment,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const NewAppointment = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [tattooArtists, setTattooArtists] = useState([]);
  const [tattoos, setTattoos] = useState([]);
  const [appointment, setAppointment] = useState({
    tattoo_artist: "",
    tattoo: "",
    date: "",
  });

  const [appointmentError, setAppointmentError] = useState({
    tattooArtistError: "",
    tattooError: "",
    dateError: "",
  });

  useEffect(() => {
    const fetchTattooArtists = async () => {
      try {
        const tattooArtistsResponse = await bringTattooArtists();

        if (Array.isArray(tattooArtistsResponse.data.data)) {
          const tattooArtistsData = tattooArtistsResponse.data.data;
          setTattooArtists(tattooArtistsData);
        } else {
          console.error(
            "Error: La respuesta de la API no contiene un array de artistas tatuadores."
          );
        }
      } catch (error) {
        console.error("Error fetching tattoo artists:", error);
      }
    };

    const fetchTattoos = async () => {
      try {
        const tattooResponse = await bringTattoo();
        if (Array.isArray(tattooResponse.data.data)) {
          const tattooData = tattooResponse.data.data;
          setTattoos(tattooData);
        } else {
          console.error(
            "Error: La respuesta de la API no contiene un array de tatuajes."
          );
        }
      } catch (error) {
        console.error("Error fetching tattoos:", error);
      }
    };

    fetchTattooArtists();
    fetchTattoos();
  }, []);

  const functionHandler = (e) => {
    const { name, value } = e.target;

    setAppointment((prevState) => ({
      ...prevState,
      [name]: name === "date" ? value : e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";

    switch (e.target.name) {
      case "tattoo_artist":
        error =
          appointment.tattoo_artist === ""
            ? "Please select a tattoo artist."
            : "";
        break;
      case "tattoo":
        error = appointment.tattoo === "" ? "Please select a tattoo." : "";
        break;
      case "date":
        error = appointment.date === "" ? "Please select a date." : "";
        break;
      default:
        break;
    }

    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const Send = () => {
    for (let test1 in appointment) {
      if (appointment[test1] === "") {
        return;
      }
    }

    for (let test in appointmentError) {
      if (appointmentError[test] !== "") {
        return;
      }
    }

    const tattooArtistId = parseInt(appointment.tattoo_artist, 10);
    const tattooId = parseInt(appointment.tattoo, 10);

    if (isNaN(tattooArtistId) || isNaN(tattooId)) {
      console.error(
        "Error: No se pueden convertir tattoo_artist y tattoo a enteros."
      );
      return;
    }

    const formattedDate = new Date(appointment.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const formattedAppointment = {
      ...appointment,
      tattoo_artist_id: tattooArtistId,
      tattoo_id: tattooId,
      date: formattedDate,
    };

    newAppointment(formattedAppointment, datosRdxUser.credentials)
      .then((resultado) => {
        navigate("/appointments");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="newAppointmentDesign">
      <select
        name="tattoo_artist"
        onChange={functionHandler}
        onBlur={errorCheck}
        className={
          appointmentError.tattooArtistError !== "" ? "inputDesignError" : ""
        }
      >
        <option>Select a tattoo artist</option>
        {tattooArtists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.tattoo_artist}
          </option>
        ))}
      </select>
      <div className="errorMsg">{appointmentError.tattooArtistError}</div>

      <select
        name="tattoo"
        onChange={functionHandler}
        onBlur={errorCheck}
        className={
          appointmentError.tattooError !== "" ? "inputDesignError" : ""
        }
      >
        <option>Select a tattoo</option>
        {tattoos.map((tattoo) => (
          <option key={tattoo.id} value={tattoo.id}>
            {tattoo.name}
          </option>
        ))}
      </select>
      <div className="errorMsg">{appointmentError.tattooError}</div>

      <CustomInput
        disabled={false}
        design={`inputDesign1 ${
          appointmentError.dateError !== "" ? "inputDesignError1" : ""
        }`}
        type={"datetime-local"}
        name={"date"}
        placeholder={""}
        value={appointment.date}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{appointmentError.dateError}</div>

      <div className="buttonSend" onClick={Send}>
        Send
      </div>
    </div>
  );
};
