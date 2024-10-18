import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ZSSelectBox } from "./Shared/selectBox";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./App.css";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredStateData, setFilteredStateData] = useState<any | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedChartType, setSelectedChartType] = useState<string>("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data.india_covid_data.states))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleStateSelect = (state: string) => {
    const selectedData = data.find((stateData) => stateData.state === state);
    setFilteredStateData(selectedData || null);
    setSelectedState(state);
  };

  const handleChartTypeSelect = (chartType: string) => {
    setSelectedChartType(chartType);
  };

  const options = data.map((stateData) => ({
    value: stateData.state,
    label: stateData.state,
  }));

  const chartTypeOptions = [
    { value: "pie-chart", label: "Pie Chart" },
    { value: "map", label: "Map" },
    { value: "line-chart", label: "Line Chart" },
  ];

  const lineChartData = filteredStateData
    ? [
        {
          date: "Day 1",
          active_cases: filteredStateData.active_cases,
          recovered: filteredStateData.recovered,
          deaths: filteredStateData.deaths,
          total_cases: filteredStateData.total_cases,
        },
      ]
    : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pieData = filteredStateData
    ? [
        { name: "Active Cases", value: filteredStateData.active_cases },
        { name: "Recovered", value: filteredStateData.recovered },
        { name: "Deaths", value: filteredStateData.deaths },
      ]
    : [];

  return (
    <div className="container">
      <h1>Covid Dashboard</h1>
      {data.length > 0 && (
        <div className="dashboard">
          <div className="select-boxes">
            <ZSSelectBox
              fieldProps={{
                id: "state-select",
                name: "state",
                label: "Select a State",
                required: true,
              }}
              options={options}
              onChange={handleStateSelect}
              value={selectedState}
              defaultValue={selectedState}
            />

            <ZSSelectBox
              fieldProps={{
                id: "chart-type-select",
                name: "chartType",
                label: "Select Chart Type",
                required: true,
              }}
              options={chartTypeOptions}
              onChange={handleChartTypeSelect}
              value={selectedChartType}
              defaultValue=""
            />
          </div>

          {filteredStateData && selectedChartType === "line-chart" && (
            <div className="data-box">
              <h2>{filteredStateData.state} COVID-19 Data</h2>
              <LineChart width={600} height={400} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="active_cases"
                  stroke={COLORS[0]}
                  name="Active Cases"
                />
                <Line
                  type="monotone"
                  dataKey="recovered"
                  stroke={COLORS[1]}
                  name="Recovered"
                />
                <Line
                  type="monotone"
                  dataKey="deaths"
                  stroke={COLORS[2]}
                  name="Deaths"
                />
                <Line
                  type="monotone"
                  dataKey="total_cases"
                  stroke={COLORS[3]}
                  name="Total Cases"
                />
              </LineChart>
            </div>
          )}

          {filteredStateData && selectedChartType === "pie-chart" && (
            <div className="data-box">
              <h2>{filteredStateData.state} COVID-19 Data</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          )}

          {filteredStateData && selectedChartType === "map" && (
            <div className="data-box">
              <h2>{filteredStateData.state} COVID-19 Map</h2>
              <MapContainer
                center={[
                  filteredStateData.latitude || 20.5937,
                  filteredStateData.longitude || 78.9629,
                ]}
                zoom={6}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredStateData && (
                  <Marker
                    position={[
                      filteredStateData.latitude || 20.5937,
                      filteredStateData.longitude || 78.9629,
                    ]}
                  >
                    <Popup>
                      {filteredStateData.state} COVID-19 Data:
                      <br />
                      Total Cases: {filteredStateData.total_cases}
                      <br />
                      Active Cases: {filteredStateData.active_cases}
                      <br />
                      Recovered: {filteredStateData.recovered}
                      <br />
                      Deaths: {filteredStateData.deaths}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          )}

          {filteredStateData &&
            selectedChartType !== "pie-chart" &&
            selectedChartType !== "line-chart" &&
            selectedChartType !== "map" && (
              <div className="data-box">
                <h2>{filteredStateData.state} COVID-19 Data</h2>
                <p>Total Cases: {filteredStateData.total_cases}</p>
                <p>Active Cases: {filteredStateData.active_cases}</p>
                <p>Recovered: {filteredStateData.recovered}</p>
                <p>Deaths: {filteredStateData.deaths}</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default App;
