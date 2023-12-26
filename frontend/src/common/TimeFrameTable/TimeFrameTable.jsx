import React, { useState, useEffect } from "react";
import './TimeFrameTable.css'
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { allTimeFrames, deleteTimeFrame, createTimeFrame } from "../../services/apiCalls";

export const TimeFramesTable = () => {
  const [allTimeFramesData, setAllTimeFramesData] = useState([]);
  const [isNewFrameVisible, setNewFrameVisible] = useState(false);
  const [newTimeFrame, setNewTimeFrame] = useState("");
  const datosRdxUser = useSelector(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTimeFrames = await allTimeFrames(datosRdxUser.credentials);
        setAllTimeFramesData(responseTimeFrames.data);
      } catch (error) {
        console.error("Error fetching allTimeFramesData:", error);
      }
    };

    fetchData();
  }, [datosRdxUser.credentials]);

  const handleDelete = async (id) => {
    try {
      await deleteTimeFrame(id, datosRdxUser.credentials);
      setAllTimeFramesData((prevFrames) => prevFrames.filter((frame) => frame.id !== id));
    } catch (error) {
      console.error('Error deleting time frame:', error);
    }
  };

  const handleCreateNewFrame = async () => {
    try {
      await createTimeFrame({ time_frame: newTimeFrame }, datosRdxUser.credentials);
      const responseTimeFrames = await allTimeFrames(datosRdxUser.credentials);
      setAllTimeFramesData(responseTimeFrames.data);
      setNewFrameVisible(false);
      setNewTimeFrame("");
    } catch (error) {
      console.error('Error creating time frame:', error);
    }
  };

  return (
    <div className="timesDesign">
      <h2 className="timesHeader">Time Frames Table</h2>
      <table className="timesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time Frame</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allTimeFramesData.map((frame) => (
            <tr key={frame.id}>
              <td>{frame.id}</td>
              <td>{frame.time_frame}</td>
              <td>
                <button onClick={() => handleDelete(frame.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="new" onClick={() => setNewFrameVisible(!isNewFrameVisible)}>New Time Frame</button>

      {isNewFrameVisible && (
        <div>
          <input
            type="text"
            placeholder="Enter Time Frame"
            value={newTimeFrame}
            onChange={(e) => setNewTimeFrame(e.target.value)}
          />
          <button className="new" onClick={handleCreateNewFrame}>Create</button>
        </div>
      )}
    </div>
  );
};
