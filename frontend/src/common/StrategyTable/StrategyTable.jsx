import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { myStrategy, allTechnicals } from "../../services/apiCalls";

export const StrategyTable = () => {
    const datosRdxUser = useSelector(userData);
    const [isEnabled, setIsEnabled] = useState(true);
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

    useEffect(() => {
        getStrategies();
        getAllTechnicals();
    }, []);

    const getTechnicalName = (technicalId) => {
        const technical = technicals.find((item) => item.id === technicalId);
        return technical ? technical.name : "";
    };

    return (
        <div>
            {Array.isArray(strategies) && strategies.map((strategy) => (
                <div key={strategy.id}>
                    <h2>
                        <input
                            type="text"
                            value={strategy.name}
                            onChange={(e) => handleNameChange({
                                ...editedValues,
                                name: e.target.value,
                            })
                        }
                        
                        />
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Buy Signal</th>
                                <th>Low Buy Parameter</th>
                                <th>High Buy Parameter</th>
                                <th>Sell Signal</th>
                                <th>Low Sell Parameter</th>
                                <th>High Sell Parameter</th>
                                <th>Time Frame</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={strategy.description}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                                <td>{getTechnicalName(strategy.buy_technical_id)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={strategy.buy_signal_parameter_1}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={strategy.buy_signal_parameter_2}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                                <td>{getTechnicalName(strategy.sell_technical_id)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={strategy.sell_signal_parameter_1}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={strategy.sell_signal_parameter_2}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={strategy.time_frame}
                                        onChange={(event) => handleDescriptionChange(event, strategy.id)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            ))}
        </div>
    );
};
