// SuperStrategies.jsx
import React from "react";
import "./SuperStrategies.css";

export const SuperStrategies = ({
  data,
  allTechnicalsData,
  allTimeFramesData,
  allUsersData,
}) => {
  const headers = [
    "id",
    "name",
    "description",
    "user",
    "buy_signal_id",
    "buy_signal_parameter_1",
    "buy_signal_parameter_2",
    "sell_signal_id",
    "sell_signal_parameter_1",
    "sell_signal_parameter_2",
    "time_frame_id",
  ];

  const getTechnicalNameById = (technicalId) => {
    const technical = allTechnicalsData.find(
      (technical) => technical.id === technicalId
    );
    return technical ? technical.name : "";
  };

  const getTimeFrameNameById = (timeFrameId) => {
    const timeFrame = allTimeFramesData.find(
      (timeFrame) => timeFrame.id === timeFrameId
    );
    return timeFrame ? timeFrame.time_frame : "";
  };

  const getUserNameById = (userId) => {
    const user = allUsersData.find(user => user.id === userId);
    return user ? user.name : '';
  };

  const getCellValue = (header, value) => {
  
    switch (header) {
      case "user_id":
        const userName = getUserNameById(value);
        return userName;
      case "time_frame_id":
        const timeFrameName = getTimeFrameNameById(value);
        return timeFrameName;
      default:
        return header.endsWith("_id") ? getTechnicalNameById(value) : value;
    }
  };
    
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={header}>{getCellValue(header, row[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )};
