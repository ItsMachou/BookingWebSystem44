import React, { useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Customer A",
      contactNumber: "123-456-7890",
      email: "customerA@example.com",
      destination: "Hawaii",
      status: "Confirmed",
      bookDate: "2024-11-01",
      package: "Luxury Package",
    },
    {
      id: 2,
      name: "Customer B",
      contactNumber: "987-654-3210",
      email: "customerB@example.com",
      destination: "Florida",
      status: "Pending",
      bookDate: "2024-11-05",
      package: "Standard Package",
    },
    {
      id: 3,
      name: "Customer C",
      contactNumber: "555-555-5555",
      email: "customerC@example.com",
      destination: "Bahamas",
      status: "Cancelled",
      bookDate: "2024-10-20",
      package: "Budget Package",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const handleDelete = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="dashboard-layout">
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>Total of Customer</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Complete Request</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Cancelled Request</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>0</h1>
          </div>
        </div>

        <div className="charts-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-section">
        <h3>Customer Information</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Book Date</th>
              <th>Package</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.contactNumber}</td>
                <td>{row.email}</td>
                <td>{row.destination}</td>
                <td>
                  <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    style={{
                      color:
                        row.status === "Confirmed"
                          ? "green"
                          : row.status === "Pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    <option value="Confirmed" style={{ color: "green" }}>
                      Confirmed
                    </option>
                    <option value="Pending" style={{ color: "orange" }}>
                      Pending
                    </option>
                    <option value="Cancelled" style={{ color: "red" }}>
                      Cancelled
                    </option>
                  </select>
                </td>
                <td>{row.bookDate}</td>
                <td>{row.package}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Home;
