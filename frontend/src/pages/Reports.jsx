import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getReport } from "../services/reportService";
import "../styles/Reports.css";

function Reports() {

  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getReport();
      setReport(data);
    } catch (error) {
      alert("Failed to load report");
    }
  };

  if (!report) {
    return (
      <div className="reports-container">
        <Sidebar />
        <div className="reports-content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">

      <Sidebar />

      <div className="reports-content">

        <h1>System Reports</h1>

        <div className="report-grid">

          <div className="report-card">
            <h2>Total Events</h2>
            <h1>{report.totalEvents}</h1>
          </div>

          <div className="report-card">
            <h2>Total Users</h2>
            <h1>{report.totalUsers}</h1>
          </div>

          <div className="report-card">
            <h2>Total Tickets</h2>
            <h1>{report.totalTickets}</h1>
          </div>

          <div className="report-card">
            <h2>Total Revenue</h2>
            <h1>₹ {report.totalRevenue}</h1>
          </div>

        </div>

        <h2 className="upcoming-title">
          Upcoming Events
        </h2>

        <table>

          <thead>

            <tr>
              <th>Title</th>
              <th>Venue</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {report.upcomingEvents.map((event) => (

              <tr key={event._id}>

                <td>{event.title}</td>

                <td>{event.venue}</td>

                <td>
                  {new Date(event.date).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <button
          className="print-btn"
          onClick={() => window.print()}
        >
          Print Report
        </button>

      </div>

    </div>
  );
}

export default Reports;