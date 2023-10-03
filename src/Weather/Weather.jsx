import React, { useEffect, useState } from "react";
import "./Weather.scss";
import axios from "axios";

import clear_img from '../Assets/clear.png';
import cloud_img from '../Assets/cloud.png';
import drizzle_img from '../Assets/drizzle.png';
import humidity_img from '../Assets/humidity.png';
import rain_img from '../Assets/rain.png';
import snow_img from '../Assets/snow.png';
import strom_img from '../Assets/storm.png';
import haze_img from '../Assets/haze.png';
//require('react-dotenv').config();

export default function Weather() {
  
  const [weather, setWeather] = useState({
    city: "Delhi",
    temperature: "23°C",
    weather_type: "Sunny",
    wind_speed: "0 km/hr",
    humidity: "0 %",
    weather_img: clear_img,
  });
  const [inputCity,setInputCity] = useState('')
  const dummyBgImgUrl = "https://imgs.search.brave.com/Bq1saXqOoS_O2riF3d7LgBu_g7fD_KD1RRat1J3-QAQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzU1NjY2NjgyMDAt/N2RjYWE3YjJjZjI4/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4T1h4/OFpHVnNhR2w4Wlc1/OE1IeDhNSHg4ZkRB/PSZ3PTEwMDAmcT04/MA"
  const [bgImg, setBgImg] = useState(`url(${dummyBgImgUrl})`)
  

  function changeHandler(e){
    setInputCity(e.target.value)
  }
  useEffect(()=>{
    FetchDataFromApi()
    changeBgImg()
  },[])

  async function FetchDataFromApi(){
    const city = (inputCity=='')? 'Delhi':inputCity
    const API_key = process.env.REACT_APP_WEATHER_API_KEY;
    const Base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_key}`
    
    try{
      const response = await axios.get(Base_url)
      if(response.status === 200){
        const Data = response.data
        setWeather({
          city : Data.name,
          temperature : Math.floor(Data.main.temp)+"°C",
          wind_speed : Math.floor(Data.wind.speed)+"km/hr",
          humidity : Math.floor(Data.main.humidity)+"%",
          weather_type : Data.weather[0].main,
          weather_img : getWeatherIcon(Data.weather[0].icon)
        })
        
      }
      else{
        throw new Error(response.message)
      }
    }
    catch(err){
      if(err.response.status === 404){
        alert("Please Enter Valid City name")
      }
      else{
        console.log(err.message)
      }
    }
    
      
  }
  async function changeBgImg(){
    try {
      const city = (inputCity=='')? 'delhi':inputCity
      const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY; 
      const Base_url = `https://api.unsplash.com/photos/random?query=${city}&client_id=${API_KEY}`
      const response = await axios.get(Base_url);
      
      if(response.status == 200){
        const imageUrl = response.data.urls.full;
        setBgImg(`url(${imageUrl})`);
      } 
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleClick(){
    FetchDataFromApi()
    changeBgImg()
  }
  
  return (
    <div className="outer-div" style={{ backgroundImage: bgImg}}>
      <div className="weather-div">
        <div className="search-div field">
          <input
            className="input-search"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={inputCity}
            onChange={changeHandler}
          />

          <i className="search-btn fa-solid fa-magnifying-glass" onClick={()=>{ handleClick() }}></i>
        </div>
        <div className="city-name field">Weather in {weather.city}</div>
        <div className="temperature field">{weather.temperature}</div>
        <div className="weather-field field">
          <img
            src={weather.weather_img}
            alt="Img here"
            className="weather-img"
          />
          <p className="weather-type">{weather.weather_type}</p>
        </div>
        <div className="humidity-and-wind">
          <p className="humidity"> Humidity {weather.humidity} </p>
          <p className="winds-speed"> Wind Speed {weather.wind_speed}</p>
        </div>
      </div>
    </div>
  );
}

const getWeatherIcon = (icon) => {
  if(icon == '01d' || icon =='01n'){
    return clear_img
  }else if(icon == '02d' || icon =='02n'){
    return cloud_img
  }else if(icon == '03d' || icon =='03n'){
    return drizzle_img
  }else if(icon == '04d' || icon =='04n'){
    return drizzle_img
  }else if(icon == '09d' || icon =='09n'){
      return rain_img
  }else if(icon == '10d' || icon =='10n'){
      return rain_img
  }else if(icon == '11d' || icon =='11n'){
    return strom_img
  }else if(icon == '13d' || icon =='13n'){
      return snow_img
  }else{
    return haze_img
  }
}


