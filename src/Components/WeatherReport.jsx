import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const WeatherReport = ({ isOpen, location }) => {
  if (!isOpen) return;

  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const responseFunc = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            lat: location[0],
            lon: location[1],
            appid: "85c39f36c9b360c25ce3f8850495eb29",
            units: "metric",
          },
        });

        if (response != null) {
          const rawData = response.data.list;

          // Group by day
          const grouped = {};
          rawData.forEach(entry => {
            const date = entry.dt_txt.slice(0, 10); // e.g., "2025-06-19"
            const time = entry.dt_txt.slice(11, 16); // e.g., "12:00"
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({ time, temp: entry.main.temp });
          });

          setGroupedData(grouped);
        }
      } catch (error) {
        console.error("Failed to fetch weather report", error);
      }
    };

    responseFunc();
  }, [location]);

  return (
    <div>
      <h2>5-Day Weather Forecast</h2>
      {Object.entries(groupedData).map(([date, data]) => (
        <div key={date} style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style = {{color : 'black' }}>{date}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis unit="°C" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default WeatherReport;
