import React, { useState, useEffect } from "react";
import {
  allTechnicals,
  allTimeFrames,
  newStrategy,
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { DropdownInput } from "../DropdownInput/DropdownInput";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const NewStrategy = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [allTechnicalsData, setAllTechnicalsData] = useState([]);
  const [allTimeFramesData, setAllTimeFramesData] = useState([]);
  const [newStrategyData, setNewStrategyData] = useState({
    parameter_1_buy: "",
    parameter_2_buy: "",
    parameter_1_sell: "",
    parameter_2_sell: "",
    time_frame_id: "",
    buy_technical_resources_id: "",
    sell_technical_resources_id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
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
    fetchAllTimeFrames();
  }, [datosRdxUser.credentials]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStrategyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    // Obtener el id asociado al nombre seleccionado
    let id = null;

    if (value !== "Choose One") {
      if (
        name === "buy_technical_resources_id" ||
        name === "sell_technical_resources_id"
      ) {
        id = allTechnicalsData.find(
          (technical) => technical.name === value
        )?.id;
      } else if (name === "time_frame_id") {
        id = allTimeFramesData.find(
          (timeFrame) => timeFrame.time_frame === value
        )?.id;
      }
    }

    setNewStrategyData((prevData) => ({
      ...prevData,
      [name]: id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenDecoded = jwtDecode(datosRdxUser.credentials);
    const newDataWithUserId = { ...newStrategyData, user_id: tokenDecoded.id };
  
    // Validación para asegurarse de que todos los campos estén completos
    const areAllFieldsFilled = Object.values(newDataWithUserId).every(
      (value) => value !== null && value !== undefined && value !== ""
    );
  
    if (areAllFieldsFilled) {
      try {
        await newStrategy(newDataWithUserId, datosRdxUser.credentials);
        navigate("/strategies");
        // Puedes redirigir o realizar otras acciones después de crear la estrategia
      } catch (error) {
        console.error("Error creating new strategy:", error);
      }
    } else {
      // Maneja la lógica cuando algún campo está incompleto
      console.error("Por favor, completa todos los campos antes de crear la estrategia.");
    }
  };
  

  return (
    <div className="newStrategy">
      <h2>Create New Strategy</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newStrategyData.name}
              onChange={handleInputChange}
              placeholder="Enter strategy name"
            />
          </div>
          <div className="form-column">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newStrategyData.description}
              onChange={handleInputChange}
              placeholder="Enter strategy description"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Buy Technical Resources:</label>
            <DropdownInput
              value={
                allTechnicalsData.find(
                  (technical) =>
                    technical.id === newStrategyData.buy_technical_resources_id
                )?.name || "Choose One"
              }
              onChange={(e) =>
                handleDropdownChange(
                  "buy_technical_resources_id",
                  e.target.value
                )
              }
              options={[
                "Choose One",
                ...allTechnicalsData.map((technical) => technical.name),
              ]}
            />
          </div>
          <div className="form-column">
            <label>Parameter 1 Buy:</label>
            <input
              type="text"
              name="parameter_1_buy"
              value={newStrategyData.parameter_1_buy}
              onChange={handleInputChange}
              placeholder="Enter parameter 1 buy"
            />
          </div>
          <div className="form-column">
            <label>Parameter 2 Buy:</label>
            <input
              type="text"
              name="parameter_2_buy"
              value={newStrategyData.parameter_2_buy}
              onChange={handleInputChange}
              placeholder="Enter parameter 2 buy"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label>Sell Technical Resources:</label>
            <DropdownInput
              value={
                allTechnicalsData.find(
                  (technical) =>
                    technical.id === newStrategyData.sell_technical_resources_id
                )?.name || "Choose One"
              }
              onChange={(e) =>
                handleDropdownChange(
                  "sell_technical_resources_id",
                  e.target.value
                )
              }
              options={[
                "Choose One",
                ...allTechnicalsData.map((technical) => technical.name),
              ]}
            />
          </div>
          <div className="form-column">
            <label>Parameter 1 Sell:</label>
            <input
              type="text"
              name="parameter_1_sell"
              value={newStrategyData.parameter_1_sell}
              onChange={handleInputChange}
              placeholder="Enter parameter 1 sell"
            />
          </div>
          <div className="form-column">
            <label>Parameter 2 Sell:</label>
            <input
              type="text"
              name="parameter_2_sell"
              value={newStrategyData.parameter_2_sell}
              onChange={handleInputChange}
              placeholder="Enter parameter 2 sell"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label>Time Frame:</label>
            <DropdownInput
              value={
                allTimeFramesData.find(
                  (timeFrame) => timeFrame.id === newStrategyData.time_frame_id
                )?.time_frame || "Choose One"
              }
              onChange={(e) =>
                handleDropdownChange("time_frame_id", e.target.value)
              }
              options={[
                "Choose One",
                ...allTimeFramesData.map((timeFrame) => timeFrame.time_frame),
              ]}
            />
          </div>
        </div>

        <button type="submit">Create Strategy</button>
      </form>
    </div>
  );
};
