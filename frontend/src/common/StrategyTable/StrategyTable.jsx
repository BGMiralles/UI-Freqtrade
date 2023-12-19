import React from 'react';

export const StrategyTable = ({ strategies }) => {
    return (
        <div>
            {strategies.map((strategy) => (
                <table key={strategy.id}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>User</th>
                            <th>Time Frame</th>
                            <th>Buy Signal</th>
                            <th>Sell Signal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{strategy.name}</td>
                            <td>{strategy.description}</td>
                            <td>{strategy.user}</td>
                            <td>{strategy.timeFrame}</td>
                            <td>{strategy.buySignal}</td>
                            <td>{strategy.sellSignal}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
};

