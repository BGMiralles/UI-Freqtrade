import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { myStrategy, allTechnicals, updateStrategy } from "../../services/apiCalls";

export const StrategyTable = () => {
    const datosRdxUser = useSelector(userData);
    const [strategies, setStrategies] = useState([]);
    const [technicals, setTechnicals] = useState([]);
    const [editedValues, setEditedValues] = useState({});

    const getStrategies = async () => {
        try {
            const response = await myStrategy(datosRdxUser.credentials);
            setStrategies(response.data.data);
        } catch (error) {
            console.error("Error fetching strategies!", error);
        }
    };

    const getAllTechnicals = async () => {
        try {
            const response = await allTechnicals(datosRdxUser.credentials);
            setTechnicals(response.data.data);
        } catch (error) {
            console.error("Error fetching Technicals!", error);
        }
    };

    const getTechnicalName = (technicalId) => {
        const technical = technicals.find((item) => item.id === technicalId);
        return technical ? technical.name : "";
    };

    const handleInputChange = (event, strategyId, field) => {
        const updatedValues = {
            ...editedValues,
            [strategyId]: {
                ...editedValues[strategyId],
                [field]: event.target.value,
            },
        };
        setEditedValues(updatedValues);
    };

    const handleSaveChanges = async (strategyId) => {
        const strategyToUpdate = editedValues[strategyId];

        try {
            // Realizar la solicitud a la API para actualizar la estrategia
            await updateStrategy(strategyId, strategyToUpdate, datosRdxUser.credentials);
            console.log(strategyToUpdate)

            // Limpiar los valores editados y volver a obtener las estrategias actualizadas
            setEditedValues({
                ...editedValues,
                [strategyId]: undefined, // Limpiar los valores editados para esa estrategia
            });

            // Obtener las estrategias actualizadas
            await getStrategies();
        } catch (error) {
            console.error("Error updating strategy!", error);
        }
    };

    useEffect(() => {
        getStrategies();
        getAllTechnicals();
    }, []);

    return (
        <div>
            {Array.isArray(strategies) &&
                strategies.map((strategy) => (
                    <div key={strategy.id}>
                        <h2>
                            <input
                                type="text"
                                value={
                                    editedValues[strategy.id]?.name ||
                                    strategy.name
                                }
                                onChange={(event) =>
                                    handleInputChange(
                                        event,
                                        strategy.id,
                                        "name"
                                    )
                                }
                            />
                        </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Buy Signal</th>
                                    <th>Low Buy Parameter 1</th>
                                    <th>High Buy Parameter 2</th>
                                    <th>Sell Signal</th>
                                    <th>Low Sell Parameter 1</th>
                                    <th>High Sell Parameter 2</th>
                                    <th>Time Frame</th>
                                    {/* Add more columns as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedValues[strategy.id]?.description ||
                                                strategy.description
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "description")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedValues[strategy.id]?.buySignal ||
                                                getTechnicalName(strategy.buy_technical_id)
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "buySignal")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={
                                                editedValues[strategy.id]?.buy_signal_parameter_1 ||
                                                strategy.buy_signal_parameter_1
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "buy_signal_parameter_1")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={
                                                editedValues[strategy.id]?.buy_signal_parameter_2 ||
                                                strategy.buy_signal_parameter_2
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "buy_signal_parameter_2")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedValues[strategy.id]?.sellSignal ||
                                                getTechnicalName(strategy.sell_technical_id)
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "sellSignal")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={
                                                editedValues[strategy.id]?.sell_signal_parameter_1 ||
                                                strategy.sell_signal_parameter_1
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "sell_signal_parameter_1")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={
                                                editedValues[strategy.id]?.sell_signal_parameter_2 ||
                                                strategy.sell_signal_parameter_2
                                            }
                                            onChange={(event) =>
                                                handleInputChange(event, strategy.id, "sell_signal_parameter_2")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedValues[strategy.id]?.time_frame ||
                                                strategy.time_frame
                                            }
                                            onChange={(event) =>
                                                handleInputChange(
                                                    event,
                                                    strategy.id,
                                                    "time_frame"
                                                )
                                            }
                                        />
                                    </td>
                                    {/* Add more input fields for additional columns */}
                                    <td>
                                        <button onClick={() => handleSaveChanges(strategy.id)}>
                                            Save Changes
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
        </div>
    );
};

