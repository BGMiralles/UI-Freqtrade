import React, { useState, useEffect } from "react";
import { createNewStrategy, allTechnicals, allTimeFrames } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { DropdownInput } from "../DropdownInput/DropdownInput";
import { CustomInput } from "../CustomInput/CustomInput";

export const NewStrategy = () => {
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
    setNewStrategyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNewStrategy(newStrategyData, datosRdxUser.credentials);
      // Puedes redirigir o realizar otras acciones después de crear la estrategia
    } catch (error) {
      console.error("Error creating new strategy:", error);
    }
  };

  return (
    <div className="newStrategy">
      <h2>Create New Strategy</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <CustomInput
          type="text"
          name="name"
          value={newStrategyData.name}
          functionProp={handleInputChange}
          placeholder="Enter strategy name"
        />

        <label>Description:</label>
        <CustomInput
          type="text"
          name="description"
          value={newStrategyData.description}
          functionProp={handleInputChange}
          placeholder="Enter strategy description"
        />

        <label>Parameter 1 Buy:</label>
        <CustomInput
          type="text"
          name="parameter_1_buy"
          value={newStrategyData.parameter_1_buy}
          functionProp={handleInputChange}
          placeholder="Enter parameter 1 buy"
        />

        <label>Parameter 2 Buy:</label>
        <CustomInput
          type="text"
          name="parameter_2_buy"
          value={newStrategyData.parameter_2_buy}
          functionProp={handleInputChange}
          placeholder="Enter parameter 2 buy"
        />

        <label>Parameter 1 Sell:</label>
        <CustomInput
          type="text"
          name="parameter_1_sell"
          value={newStrategyData.parameter_1_sell}
          functionProp={handleInputChange}
          placeholder="Enter parameter 1 sell"
        />

        <label>Parameter 2 Sell:</label>
        <CustomInput
          type="text"
          name="parameter_2_sell"
          value={newStrategyData.parameter_2_sell}
          functionProp={handleInputChange}
          placeholder="Enter parameter 2 sell"
        />

        <label>Time Frame:</label>
        <DropdownInput
          value={newStrategyData.time_frame_id}
          onChange={(e) => handleDropdownChange("time_frame_id", e.target.value)}
          options={allTimeFramesData.map((timeFrame) => timeFrame.time_frame)}
        />

        <label>Buy Technical Resources:</label>
        <DropdownInput
          value={newStrategyData.buy_technical_resources_id}
          onChange={(e) => handleDropdownChange("buy_technical_resources_id", e.target.value)}
          options={allTechnicalsData.map((technical) => technical.name)}
        />

        <label>Sell Technical Resources:</label>
        <DropdownInput
          value={newStrategyData.sell_technical_resources_id}
          onChange={(e) => handleDropdownChange("sell_technical_resources_id", e.target.value)}
          options={allTechnicalsData.map((technical) => technical.name)}
        />

        <button type="submit">Create Strategy</button>
      </form>
    </div>
  );
};

