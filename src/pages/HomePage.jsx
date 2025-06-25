import React , {useState , useEffect} from 'react';
import axios from 'axios';
import MapView from '../Components/MapView';
import WeatherDetails from '../Components/WeatherDetails';
import WeatherReport from '../Components/WeatherReport';
const HomePage = () => {
    const [coordinates , setCoordinates ] = useState (null);
    const [location , setLocation] = useState("");
    const [showWeatherReport , setShowWeatherReport] = useState(false);

    useEffect (() => {
        console.log("📍 Attempting to get location...");
        navigator.geolocation.getCurrentPosition( (position) => {
            setCoordinates([position.coords.latitude, position.coords.longitude]);
            console.log("🎯 Current coordinates in HomePage:", coordinates);
        }, 
        (error) => {
            console.error("Error from getting location" , error);
            setCoordinates([28.6139, 77.2090]);

        }
    );
    


    } , []);

    const coordinatesFinder = async () => {
        if (!location.trim()) {
           console.log("⚠️ Please enter a location");
           return;
        }
        try{
            console.log("🔍 Sending location string:", location, typeof location);
            const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
                                params: {
                                  q: location.trim(),
                                  limit: 1,
                                  appid: '85c39f36c9b360c25ce3f8850495eb29'
                                }
                            });
            if( response.data.length === 0){
                console.log("No location found for " , location);
                return;
            }
            else{
                console.log("location found !");
                console.log("location found for - lat = " , response.data[0].lat);
            }
            setCoordinates([response.data[0].lat , response.data[0].lon]);


        }
        catch(error){
            console.log("Failed to find coordinates" ,error);

        }
        



    };
    if(!coordinates) return ;

    return (
        <div>
            <h1>KK Weather </h1>
            <div>
                <input id = "location" placeholder = "Enter the location" value = {location} onChange = {(e) => { setLocation(e.target.value)}} />
                <button onClick = {coordinatesFinder}>Search</button>

            </div>
            <div style={{ width: "600px", height: "400px",border: "2px solid black",margin: "auto", marginTop: "50px"}}>
                <MapView pos = {coordinates} setpos = {(coordinates) => { setCoordinates(coordinates) } }/>
            </div>
            <div><WeatherDetails coordinates = {coordinates}/></div>
            <button onClick = {() => {setShowWeatherReport(true)}}> Weather Report for upcoming days</button>
            <WeatherReport isOpen = {showWeatherReport} location ={coordinates} />
            

        </div>

    )


}
export default HomePage;
