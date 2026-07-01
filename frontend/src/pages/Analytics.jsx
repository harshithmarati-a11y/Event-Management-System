import Sidebar from "../components/Sidebar";
import "../styles/Analytics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Revenue (₹)",
        data: [10000, 25000, 18000, 35000, 45000, 60000],
        backgroundColor: "#8b5cf6"
      }
    ]
  };

  const ticketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Tickets Sold",
        data: [100, 300, 250, 500, 650, 900],
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4"
      }
    ]
  };

  return (
    <div className="analytics-container">

      <Sidebar />

      <div className="analytics-content">

        <h1>Analytics Dashboard</h1>

        <div className="analytics-cards">

          <div className="analytics-card">
            <h2>120</h2>
            <p>Total Events</p>
          </div>

          <div className="analytics-card">
            <h2>5200</h2>
            <p>Tickets Sold</p>
          </div>

          <div className="analytics-card">
            <h2>₹2.5L</h2>
            <p>Total Revenue</p>
          </div>

        </div>

        <div className="chart-box">
          <h2>Monthly Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="chart-box">
          <h2>Tickets Sold Trend</h2>
          <Line data={ticketData} />
        </div>

      </div>

    </div>
  );
}

export default Analytics;