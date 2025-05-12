import { useState,useMemo, useCallback } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('New York')
  const [weather,setWeather] = useState(null)
  const [loading,setLoading] = useState(false)

  const ApiUrl = useMemo(()=>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={My_key}`),[city])
  
  // Fetch the data
  const fetchData = useCallback(
    async()=>{
      setLoading(true)
      try{
        const response = await fetch(ApiUrl)
        if (!response.ok){
          console.log("failed to fetch weather data")
        }
        const data = await response.json()
        setWeather(data)
        console.log(data)
      }
      catch(error){
        console.log("error fetching data",error)
      }
      finally{
        setLoading(false)
      }
    },[ApiUrl]);

  return (
    <div>
    <h1>Weather App</h1>
    <form>
      <input 
        type="text" 
        placeholder='Enter the city'
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        ></input>
    </form>
    <button onClick={fetchData}>Fetch Weather</button>
    {loading && <h1>Loading...</h1>}
    {weather && (
      <div>
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].description}</p>
        <p>Temprature: {weather.main.temp} kelvin</p>
        <p>Humidity: {weather.main.humidity}% </p>
        <p>Wind speed: {weather.wind.speed}m/s</p>
      </div>
    )}
    </div>
  )
}

export default App
