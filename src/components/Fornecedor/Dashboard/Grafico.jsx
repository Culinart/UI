import React from "react";

import Chart  from "chart.js/auto";
import { Line } from "react-chartjs-2";

// Chart.register(LinearScale)

function Grafico({ chartData }) {
    return (
        <>
            <Line 
                data={chartData} 
            />
        </>
    )
}

export default Grafico;