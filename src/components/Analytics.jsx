import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function Analytics({ contributions }) {

    const totals = {};

    contributions.forEach((c) => {

        totals[c.member] = (totals[c.member] || 0) + c.hours;

    });

    const data = {

        labels: Object.keys(totals),

        datasets: [

            {

                label: "Hours",

                data: Object.values(totals)

            }

        ]

    };

    return (

        <div className="card">

            <h2>Contribution Analytics</h2>

            <Bar data={data} />

        </div>

    );

}

export default Analytics;