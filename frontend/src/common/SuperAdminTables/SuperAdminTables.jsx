import React from "react";
import "./SuperAdminTables.css";

export const UserTable = ({ users }) => {
  return (
    <div className="userTableDesign">
      <h2>User Table</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Is Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.is_active === true ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AppointmentTable = ({ appointments }) => {
  return (
    <div className="userTableDesign">
      <h2>Appointment Table</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Tattoo Artist</th>
              <th>Tattoo</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.user_name}</td>
                <td>{appointment.tattoo_artist_name}</td>
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
