import {
    Bar,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

import { avatarColor } from "../utils/colors";
import { weightedHours } from "../utils/difficulty";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

function getMonday(dateStr) {

    const d = new Date(dateStr);

    const day = d.getDay();

    const diffToMonday = (day === 0 ? -6 : 1) - day;

    const monday = new Date(d);

    monday.setDate(d.getDate() + diffToMonday);

    return monday;

}

function weekKey(dateStr) {
    return getMonday(dateStr).toISOString().split("T")[0];
}

function weekLabel(dateStr) {
    return getMonday(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function Analytics({ contributions, members }) {

    // --- totals per member (bar chart) ---

    const totals = {};

    members.forEach((m) => (totals[m.name] = 0));

    contributions.forEach((c) => {
        totals[c.member] = (totals[c.member] || 0) + weightedHours(c.hours, c.difficulty);
    });

    const labels = Object.keys(totals);

    const values = Object.values(totals);

    const barData = {

        labels,

        datasets: [

            {
                label: "Hours",
                data: values,
                backgroundColor: "#45635c",
                borderRadius: 6
            }

        ]

    };

    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: { display: false }
        },

        scales: {
            y: { beginAtZero: true, grid: { color: "#e3e5ea" } },
            x: { grid: { display: false } }
        }

    };

    // --- weekly trend per member (line chart) ---

    const sortedWeekKeys = [...new Set(contributions.map((c) => weekKey(c.date)))].sort();

    const weekLabels = sortedWeekKeys.map((key) => {
        const match = contributions.find((c) => weekKey(c.date) === key);
        return weekLabel(match.date);
    });

    const trendDatasets = members.map((m) => {

        const weeklyHours = sortedWeekKeys.map((key) =>
            contributions
                .filter((c) => c.member === m.name && weekKey(c.date) === key)
                .reduce((sum, c) => sum + weightedHours(c.hours, c.difficulty), 0)
        );

        const color = avatarColor(m.name);

        return {
            label: m.name,
            data: weeklyHours,
            borderColor: color,
            backgroundColor: color,
            tension: 0.3,
            pointRadius: 3
        };

    });

    const trendData = {
        labels: weekLabels,
        datasets: trendDatasets
    };

    const trendOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } }
        },

        scales: {
            y: { beginAtZero: true, grid: { color: "#e3e5ea" } },
            x: { grid: { display: false } }
        }

    };

    const showTrend = sortedWeekKeys.length >= 2;

    // --- fairness insight ---

    const nonZero = values.filter((v) => v > 0);

    let insight = null;

    if (nonZero.length >= 2) {

        const max = Math.max(...values);

        const min = Math.min(...nonZero);

        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        const topMember = labels[values.indexOf(max)];

        const bottomMember = labels[values.indexOf(min)];

        const imbalance = max > 0 ? Math.round(((max - min) / max) * 100) : 0;

        let level = "balanced";

        if (imbalance >= 60) level = "alert";
        else if (imbalance >= 35) level = "warn";

        insight = { max, min, avg: avg.toFixed(1), imbalance, topMember, bottomMember, level };

    }

    return (

        <div className="card">

            <h2>Contribution Analytics</h2>

            {contributions.length === 0 ? (

                <p className="no-tasks">Log a few contributions to see analytics here.</p>

            ) : (

                <>

                    <div className={showTrend ? "chart-grid" : ""}>

                        <div>
                            <p className="chart-title">Weighted Hours by Member</p>
                            <p className="chart-caption">Hard ×1.5 · Medium ×1 · Easy ×0.75</p>
                            <div className="chart-container">
                                <Bar data={barData} options={chartOptions} />
                            </div>
                        </div>

                        {showTrend && (

                            <div>
                                <p className="chart-title">Weekly Trend</p>
                                <p className="chart-caption">Also difficulty-weighted</p>
                                <div className="chart-container">
                                    <Line data={trendData} options={trendOptions} />
                                </div>
                            </div>

                        )}

                    </div>

                    {insight && (

                        <div className={`fairness-insight fairness-${insight.level}`}>

                            {insight.level === "balanced" && (
                                <p>✓ Workload looks fairly balanced across the team (avg {insight.avg} weighted hrs).</p>
                            )}

                            {insight.level === "warn" && (
                                <p>
                                    ⚠ Contribution gap detected — <strong>{insight.topMember}</strong> has
                                    {insight.imbalance}% more weighted hours than <strong>{insight.bottomMember}</strong>.
                                    Worth checking in.
                                </p>
                            )}

                            {insight.level === "alert" && (
                                <p>
                                    ⚠ Significant imbalance — <strong>{insight.topMember}</strong> ({insight.max.toFixed(1)}h weighted)
                                    vs <strong>{insight.bottomMember}</strong> ({insight.min.toFixed(1)}h weighted). Consider
                                    redistributing tasks.
                                </p>
                            )}

                        </div>

                    )}

                </>

            )}

        </div>

    );

}

export default Analytics;
