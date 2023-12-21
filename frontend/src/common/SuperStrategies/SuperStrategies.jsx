import React from 'react';
import "./SuperStrategies.css";

export const SuperStrategies = ({ data }) => {
  const headers = ["id", "name", "description", "user", "buy_signal_id", "buy_signal_parameter_1",
  "buy_signal_parameter_2", "sell_signal_id", "sell_signal_parameter_1",
  "sell_signal_parameter_2","time_frame_id"];

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {headers.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

