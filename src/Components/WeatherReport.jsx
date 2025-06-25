import React from 'react'
import {useState , useEffect} from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const WeatherReport = ({isOpen , location}) => {
    if( isOpen == false){
        return; 
    }
    const [chartData, setChartData] = useState([]);
    console.log("location in report is = ", location);
    useEffect (() => {
        const responseFunc = async () => {
            try{
                const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast' , 
                    {
                        params : {
                            lat : location[0],
                            lon : location[1],
                            appid : "85c39f36c9b360c25ce3f8850495eb29",
                            units: "metric",
                        },

                    }
                );
                if( response != null){
                    const responseData = response.data.list.map(entry => ({
                       time: entry.dt_txt.slice(5, 16), // e.g., "06-20 15:00"
                       temp: entry.main.temp
                    }));
                    setChartData(responseData);

                }
            }
            catch{
                console.error("Failed to fetch weather report");

            }
            

        }
        responseFunc();
        


    }, [location]);
    if(chartData == null){
        return( <div> Forecast not found</div>);
    }
    return (
        <div>
            <h1> Weather Forecast </h1>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis unit="°C" />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
        </div>

    );

};
export default WeatherReport;

