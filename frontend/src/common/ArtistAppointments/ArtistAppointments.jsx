import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deletemyappointments,
  updateAppointment,
  bringTattoo,
  artistappointments,
  deletemyappointmentsArtist,
} from "../../services/apiCalls";
import { userData } from "../../pages/userSlice";
import { DropdownInput } from "../DropdownInput/DropdownInput";
import { useNavigate } from "react-router-dom";

export const Works = ({ appo, setAppointments }) => {
  const headers = [
    "User Name",
    "Phone Number",
    "Work",
    "Tattoo",
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
  const [editedValues, setEditedValues] = useState([]);
  const [tattoos, setTattoos] = useState([]);
  const [tattooDropdownOptions, setTattooDropdownOptions] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const fetchData = async () => {
    try {
      const response = await artistappointments(datosRdxUser.credentials);
      if (isMounted) {
        setUpdatedAppointments(response.data.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchTattoos = async () => {
    try {
      const tattooResponse = await bringTattoo(datosRdxUser.credentials);
      if (isMounted) {
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
      }
    } catch (error) {
      console.error("Error fetching tattoos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTattoos();

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      await deletemyappointmentsArtist(appointmentId, datosRdxUser.credentials);
      const updatedAppointments = appo.filter(
        (user) => user.id !== appointmentId
      );
      if (isMounted) {
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };
  

  const handleEdit = (appointmentId) => {
    setEditingId(appointmentId);
    setEditedValues({});
  };

  const handleSaveEdit = async (appointmentId, user) => {
    try {
      const selectedTattoo = tattoos.find(
        (tattoo) => tattoo.name === (editedValues.tattoo || user.tattoo)
      );
      const tattooId = selectedTattoo ? selectedTattoo.id : null;

      const formattedDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const editedValuesWithId = {
        user_id: user.user_id,
        user_name:
          editedValues.user_name !== undefined
            ? editedValues.user_name
            : user.user_name,
        phone_number:
          editedValues.phone_number !== undefined
            ? editedValues.phone_number
            : user.phone_number,
        work: editedValues.work !== undefined ? editedValues.work : user.work,
        tattoo_id: tattooId !== null ? tattooId : user.tattoo_id,
        price:
          editedValues.price !== undefined ? editedValues.price : user.price,
        date:
          editedValues.date !== undefined ? editedValues.date : formattedDate,
        status:
          editedValues.status !== undefined ? editedValues.status : user.status,
      };

      await updateAppointment(
        appointmentId,
        editedValuesWithId,
        datosRdxUser.credentials
      );
      console.log(editedValuesWithId);

      if (Array.isArray(appo)) {
        const updatedAppointments = appo.map((u) =>
          u.id === appointmentId ? { ...u, ...editedValues } : u
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
          {Array.isArray(updatedAppointments) &&
            updatedAppointments.map((user) => (
              <tr key={user.id}>
                <td>{user.user_name}</td>
                <td>{user.phone_number}</td>
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
                    />
                  ) : (
                    user.work
                  )}
                </td>
                <td>
                  {user.id === editingId ? (
                    <DropdownInput
                      value={editedValues.tattoo || user.tattoo}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          tattoo: e.target.value,
                        })
                      }
                      options={tattooDropdownOptions.map(
                        (option) => option.value
                      )}
                    />
                  ) : (
                    user.tattoo
                  )}
                </td>

                <td>
                  {user.id === editingId ? (
                    <input
                      type="text"
                      value={editedValues.price || user.price}
                      disabled={true}
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
                    <DropdownInput
                      value={editedValues.status || user.status}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          status: e.target.value,
                        })
                      }
                      options={["pending", "accomplish"]}
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
                        onClick={() => handleSaveEdit(user.id, user)}
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
                      className="edit"
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
    </div>
  );
};
