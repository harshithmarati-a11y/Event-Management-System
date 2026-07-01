import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <h1>Dashboard</h1>

        {/* Statistics Cards */}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>120</h2>
            <p>Total Events</p>
          </div>

          <div className="dashboard-card">
            <h2>5,200</h2>
            <p>Tickets Sold</p>
          </div>

          <div className="dashboard-card">
            <h2>₹2,50,000</h2>
            <p>Total Revenue</p>
          </div>

          <div className="dashboard-card">
            <h2>3,400</h2>
            <p>Registered Users</p>
          </div>

        </div>

        {/* Recent Events */}

        <div className="recent-events">

          <h2>Recent Events</h2>

          <table>

            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Tech Conference 2026</td>
                <td>10 Aug 2026</td>
                <td>Bangalore</td>
                <td>Upcoming</td>
              </tr>

              <tr>
                <td>Music Festival</td>
                <td>15 Aug 2026</td>
                <td>Mumbai</td>
                <td>Active</td>
              </tr>

              <tr>
                <td>Business Summit</td>
                <td>20 Aug 2026</td>
                <td>Delhi</td>
                <td>Completed</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;