import React, { useState, useEffect } from "react";
import {
  myStrategy,
  allTechnicals,
  allTimeFrames,
  updateStrategy,
  deleteMyStrategy,
} from "../../services/apiCalls";
import "./StrategyTable.css";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { LinkButton } from "../LinkButton/LinkButton";

export const StrategyTable = () => {
  const datosRdxUser = useSelector(userData);
  const [strategyData, setStrategyData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [allTechnicalsData, setAllTechnicalsData] = useState([]);
  const [allTimeFramesData, setAllTimeFramesData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myStrategy(datosRdxUser.credentials);
        if (Array.isArray(response.data.data)) {
          setStrategyData(response.data.data);
        } else {
          console.error(
            "Error: La respuesta de la API no tiene la estructura esperada."
          );
        }
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    const fetchAllTechnicals = async () => {
      try {
        const response = await allTechnicals(datosRdxUser.credentials);
        setAllTechnicalsData(response.data.data);
      } catch (error) {
        console.error("Error fetching allTechnicals:", error);
      }
    };

    const fetchAllTimeFrames = async () => {
      try {
        const response = await allTimeFrames(datosRdxUser.credentials);
        setAllTimeFramesData(response.data);
      } catch (error) {
        console.error("Error fetching allTimeFrames:", error);
      }
    };

    fetchAllTechnicals();
    fetchData();
    fetchAllTimeFrames();
  }, [datosRdxUser.credentials]);

  const getTechnicalNameById = (technicalId) => {
    const technical = allTechnicalsData.find(
      (technical) => technical.id === technicalId
    );
    return technical ? technical.name : "";
  };

  const getTimeFrameNameById = (timeFrameId) => {
    if (!timeFrameId || !allTimeFramesData || allTimeFramesData.length === 0) {
      return "";
    }

    const timeFrame = allTimeFramesData.find(
      (timeFrame) => timeFrame.id === timeFrameId
    );

    return timeFrame ? timeFrame.time_frame : "";
  };

  const headers = [
    "Name",
    "Description",
    "Buy Signal",
    "Low Buy Parameter",
    "High Buy Parameter",
    "Sell Signal",
    "Low Sell Parameter",
    "High Sell Parameter",
    "Time Frame",
  ];

  const handleEdit = (strategyId) => {
    setEditingId(strategyId);
    const strategyToEdit = strategyData.find(
      (strategy) => strategy.id === strategyId
    );
    setEditedValues({ ...strategyToEdit });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedValues({});
    setIsEditing(false);
  };

  const handleSaveEdit = async (strategyId) => {
    try {
      const updatedData = {
        parameter_1_buy: editedValues.buy_signal_parameter_1,
        parameter_2_buy: editedValues.buy_signal_parameter_2,
        parameter_1_sell: editedValues.sell_signal_parameter_1,
        parameter_2_sell: editedValues.sell_signal_parameter_2,
        time_frame_id: editedValues.time_frame_id,
        name: editedValues.name,
        description: editedValues.description,
        buy_technical_resources_id: editedValues.buy_technical_resources_id,
        sell_technical_resources_id: editedValues.sell_technical_resources_id,
        id: strategyId,
      };

      await updateStrategy(strategyId, updatedData, datosRdxUser.credentials);

      const response = await myStrategy(datosRdxUser.credentials);
      const updatedStrategy = response.data.data.find(
        (strategy) => strategy.id === strategyId
      );

      const updatedStrategies = strategyData.map((strategy) =>
        strategy.id === strategyId ? { ...strategy, ...updatedStrategy } : strategy
      );
      setStrategyData(updatedStrategies);

      setEditedValues({});
      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  const handleDelete = async (strategyId) => {
    try {
      await deleteMyStrategy(strategyId, datosRdxUser.credentials);

      const updatedStrategies = strategyData.filter(
        (strategy) => strategy.id !== strategyId
      );
      setStrategyData(updatedStrategies);

      setEditedValues({});
      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al eliminar la estrategia:", error);
    }
  };

  return (
    <div className="strategyDesign">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {strategyData.map((strategy) => (
            <tr key={strategy.id}>
              <td>
                {strategy.id === editingId ? (
                  <input
                    type="text"
                    value={editedValues.name}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  strategy.name
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <input
                    type="text"
                    value={editedValues.description}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  strategy.description
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <select
                    value={editedValues.buy_technical_resources_id}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        buy_technical_resources_id: e.target.value,
                      })
                    }
                  >
                    {allTechnicalsData.map((technical) => (
                      <option key={technical.id} value={technical.id}>
                        {technical.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  getTechnicalNameById(strategy.buy_technical_resources_id)
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <input
                    type="text"
                    value={editedValues.buy_signal_parameter_1}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        buy_signal_parameter_1: e.target.value,
                      })
                    }
                  />
                ) : (
                  strategy.buy_signal_parameter_1
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <div>
                    <input
                      type="text"
                      value={editedValues.buy_signal_parameter_2}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          buy_signal_parameter_2: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div>{strategy.buy_signal_parameter_2}</div>
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <select
                    value={editedValues.sell_technical_resources_id}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        sell_technical_resources_id: e.target.value,
                      })
                    }
                  >
                    {allTechnicalsData.map((technical) => (
                      <option key={technical.id} value={technical.id}>
                        {technical.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  getTechnicalNameById(strategy.sell_technical_resources_id)
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <input
                    type="text"
                    value={editedValues.sell_signal_parameter_1}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        sell_signal_parameter_1: e.target.value,
                      })
                    }
                  />
                ) : (
                  strategy.sell_signal_parameter_1
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <input
                    type="text"
                    value={editedValues.sell_signal_parameter_2}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        sell_signal_parameter_2: e.target.value,
                      })
                    }
                  />
                ) : (
                  strategy.sell_signal_parameter_2
                )}
              </td>
              <td>
                {strategy.id === editingId ? (
                  <select
                    value={editedValues.time_frame_id}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        time_frame_id: e.target.value,
                      })
                    }
                  >
                    {allTimeFramesData.map((timeFrame) => (
                      <option key={timeFrame.id} value={timeFrame.id}>
                        {timeFrame.time_frame}
                      </option>
                    ))}
                  </select>
                ) : (
                  getTimeFrameNameById(strategy.time_frame_id)
                )}
              </td>
              <td>
                {isEditing && strategy.id === editingId ? (
                  <>
                    <button onClick={() => handleSaveEdit(strategy.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                    <button onClick={() => handleDelete(strategy.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(strategy.id)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LinkButton path="/newstrategy" title="New Strategy" />
    </div>
  );
};