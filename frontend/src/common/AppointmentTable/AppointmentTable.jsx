import React, { useEffect, useState } from "react";
import "./AppointmentTable.css";
import { useSelector } from "react-redux";
import {
  deletemyappointments,
  myappointments,
  updateAppointment,
  bringTattooArtists,
  bringTattoo,
} from "../../services/apiCalls";
import { userData } from "../../pages/userSlice";
import { DropdownInput } from "../DropdownInput/DropdownInput";
import { useNavigate } from "react-router-dom";

export const Print = ({ appo, setAppointments }) => {
  const headers = [
    "User Name",
    "Tattoo Artist Name",
    "Work",
    "Name",
    "Description",
    "Price",
    "Date",
    "Status",
    "Actions",
  ];

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(dateString).toLocaleString(undefined, options);
  };

  const datosRdxUser = useSelector(userData);
  const navigate = useNavigate();
  const [updatedAppointments, setUpdatedAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [tattooArtists, setTattooArtists] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [tattoos, setTattoos] = useState([]);
  const [tattooDropdownOptions, setTattooDropdownOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await myappointments(datosRdxUser.credentials);
      setUpdatedAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchTattoos = async () => {
    try {
      const tattooResponse = await bringTattoo(datosRdxUser.credentials);
      if (Array.isArray(tattooResponse.data.data)) {
        const tattooData = tattooResponse.data.data;

        setTattoos(tattooData);

        const tattooOptions = tattooData.map((tattoo) => ({
          value: tattoo.name,
          label: tattoo.name,
        }));

        setTattooDropdownOptions(tattooOptions);
      } else {
        console.error(
          "Error: La respuesta de la API no contiene un array de tatuajes."
        );
      }
    } catch (error) {
      console.error("Error fetching tattoos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTattoos();
  }, []);

  useEffect(() => {
    const fetchTattooArtists = async () => {
      try {
        const tattooArtistsResponse = await bringTattooArtists(
          datosRdxUser.credentials
        );

        if (Array.isArray(tattooArtistsResponse.data.data)) {
          const tattooArtistsData = tattooArtistsResponse.data.data;

          setTattooArtists(tattooArtistsData);

          const options = tattooArtistsData.map((artist) => ({
            value: artist.tattoo_artist,
            label: artist.tattoo_artist,
          }));

          setDropdownOptions(options);
        } else {
          console.error(
            "Error: La respuesta de la API no contiene un array de artistas tatuadores."
          );
        }
      } catch (error) {
        console.error("Error fetching tattoo artists:", error);
      }
    };

    fetchTattooArtists();
  }, [datosRdxUser.credentials]);

  const handleDelete = async (appointmentId) => {
    try {
      await deletemyappointments(datosRdxUser.credentials);
      const updatedAppointments = appo.filter(
        (user) => user.id !== appointmentId
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  const handleEdit = (appointmentId) => {
    setEditingId(appointmentId);
    setEditedValues({});
  };

  const handleSaveEdit = async (appointmentId) => {
    try {
      const selectedTattooArtist = tattooArtists.find(
        (artist) => artist.tattoo_artist === editedValues.tattoo_artist_name
      );
      const tattooArtistId = selectedTattooArtist
        ? selectedTattooArtist.id
        : null;

      const selectedTattoo = tattoos.find(
        (tattoo) => tattoo.name === editedValues.name
      );
      const tattooId = selectedTattoo ? selectedTattoo.id : null;

      // Filtrar los valores editados que no son undefined o null
      const editedValuesWithId = Object.fromEntries(
        Object.entries({
          user_name: editedValues.user_name,
          tattoo_artist_id: tattooArtistId,
          work: editedValues.work,
          tattoo_id: tattooId,
          description: editedValues.description,
          price: editedValues.price,
          date: editedValues.date,
          status: editedValues.status,
        }).filter(([key, value]) => value !== undefined && value !== null)
      );

      await updateAppointment(
        appointmentId,
        editedValuesWithId,
        datosRdxUser.credentials
      );

      if (Array.isArray(appo)) {
        const updatedAppointments = appo.map((user) =>
          user.id === appointmentId ? { ...user, ...editedValues } : user
        );

        setAppointments(updatedAppointments);
        setEditingId(null);
        setEditedValues({});
      } else {
        console.error("Error: appo no es un array");
      }
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  const handleNewAppointmentClick = () => {
    navigate("/newappointments");
  };

  return (
    <div className="printDesign">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(appo) &&
            appo.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.user_name || user.user_name}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          user_name: e.target.value,
                        })
                      }
                      disabled
                    />
                  ) : (
                    user.user_name
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <DropdownInput
                      value={
                        editedValues.tattoo_artist_name ||
                        user.tattoo_artist_name
                      }
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          tattoo_artist_name: e.target.value,
                        })
                      }
                      options={dropdownOptions.map((option) => option.value)}
                    />
                  ) : (
                    user.tattoo_artist_name
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.work || user.work}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          work: e.target.value,
                        })
                      }
                      disabled
                    />
                  ) : (
                    user.work
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <DropdownInput
                      value={editedValues.name || user.name}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          name: e.target.value,
                        })
                      }
                      options={tattooDropdownOptions.map(
                        (option) => option.value
                      )}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.description || user.description}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          description: e.target.value,
                        })
                      }
                      disabled
                    />
                  ) : (
                    user.description
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.price || user.price}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          price: e.target.value,
                        })
                      }
                      disabled
                    />
                  ) : (
                    user.price
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.date || user.date}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          date: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(user.date)
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.status || user.status}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          status: e.target.value,
                        })
                      }
                      disabled
                    />
                  ) : (
                    user.status
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <>
                      <button
                        className="save"
                        onClick={() => handleSaveEdit(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit "
                      onClick={() => handleEdit(user.id)}
                    >
                      EDIT
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="buttonSubmit" onClick={handleNewAppointmentClick}>
        New Appointment
      </div>
    </div>
  );
};
