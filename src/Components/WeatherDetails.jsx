import React , {useState , useEffect} from 'react';
import axios from 'axios';
const WeatherDetails = ({coordinates}) => {
    console.log("🌡️ 2WeatherDetails got coordinates:", coordinates);


    const [weatherData , setWeatherData] = useState(null);
    useEffect (() => {
        const fetchData = async () => {
            try {
               const response = await axios.get(
               "https://api.openweathermap.org/data/2.5/weather",
               {
               params: {
               lat : coordinates[0],
               lon : coordinates[1],
               appid: "85c39f36c9b360c25ce3f8850495eb29",
               units: "metric",
               },
               }
            );
            setWeatherData(response.data);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
            



        };
        fetchData();


    } ,[coordinates]);

    if (!weatherData) return <div>Loading...</div>;

    return(
        <div>
            <div>{weatherData.name}</div>
            <div>Temperature : {weatherData.main.temp}</div>
            <div>{weatherData.weather[0].description}</div>
        </div>

    );


};
export default WeatherDetails ;