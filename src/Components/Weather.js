import React, { useState, useEffect } from "react";
import "./compo.css";
//imgaes import
import brokenCloud from "../Elements/broken clouds.png";
import haze from "../Elements/haze.png";
import mist from "../Elements/mist.png";
import lightRain from "../Elements/light rain.png";
import overcast from "../Elements/overcast clouds.png";
import rain from "../Elements/rain.png";
import clearSky from "../Elements/clear sky.png";
import sunrise from "../Elements/sunrise.png";
import sunset from "../Elements/sunset.png";
import humidity from "../Elements/humidity.png";
import wind from "../Elements/wind.png";

let initailStateImg =
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDU1Njd8MHwxfHNlYXJjaHwxfHxkZWxoaXxlbnwwfDB8fHwxNjU4MzA3NjI3&ixlib=rb-1.2.1&q=80";

const Weather = () => {
  //state
  const [search, setSearch] = useState("Delhi");
  const [alldata, setalldata] = useState({});
  const [weatherImg, setWeatherImg] = useState("weather Mood");
  const [backgroundImg, setbackgrounImg] = useState(initailStateImg);
  // console.log(alldata.cityname);
  //----------------------use Effect------------------------------------------------
  // what i want is only my first reload only delhi data shows otherewise it works on our search we use use Effect
  useEffect(() => {
    submit();
  }, []); //[] this makes sure it only run on our first reload
  //-----------------------------------------------------------------------------------
  //weather imgaes setup--------------------
  useEffect(() => {
    if (alldata.mood) {
      switch (alldata.mood) {
        case "Thunderstorm":
        case "Rain":
          setWeatherImg(rain);
          break;

        case "Haze":
          setWeatherImg(haze);
          break;

        case "Clouds":
        case "Scattered Clouds":
          setWeatherImg(clearSky);
          break;

        case "Drizzle":
        case "Light rain":
          setWeatherImg(lightRain);
          break;

        case "Overcast clouds":
          setWeatherImg(overcast);
          break;

        case "Broken clouds":
          setWeatherImg(brokenCloud);
          break;

        case "Clear" || "Clear Sky":
          setWeatherImg(clearSky);
          break;

        case "Mist":
          setWeatherImg(mist);
          break;

        default:
          alert("We get different mood");
          break;
      }
    }
  }, [alldata.mood]); //[] kiske change hone par chlega

  //functions----to fectch api---------
  const submit = async () => {
    try {
      if (search === "") {
        setSearch("First enter your city name");
      } else {
        setSearch("");
        const API = "d3bf2a20b17f0d9c8bc0f4c9685ae155";
        const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${search}&APPID=${API}`;
        const response = await fetch(URL);
        const weatherData = await response.json();
        console.log(weatherData);
        // let temp = weatherData.main.temp; Or
        const { temp, humidity, pressure } = weatherData.main; //object destructring
        const { main: mood } = weatherData.weather[0]; //object destructring
        const { sunrise, sunset, country } = weatherData.sys; //object destructring
        const { speed } = weatherData.wind; //object destructring
        const { name: cityname, cod } = weatherData; //object destructring
        // console.log(temp);
        // console.log(humidity);
        // console.log(pressure);
        // console.log(mood);
        // console.log(speed);
        // console.log(sunrise);
        // console.log(sunset);
        // console.log(name);
        // console.log(cityname);
        const dataCollection = {
          temp,
          humidity,
          pressure,
          mood,
          sunrise,
          sunset,
          speed,
          cityname,
          cod,
          country,
        };
        setalldata(dataCollection);
      }
      //--------------images API--------------------------------------------------------------------
      const APIImage = "lXUAlvWaUWoMjL6gEu2CEThWkO2u2__JTBCbtGTqvdE";

      let urlImage = `https://api.unsplash.com/search/photos?query=${search.toLowerCase()}&orientation=landscape&client_id=${APIImage}`;
      const imageResponse = await fetch(urlImage);
      console.log(imageResponse);
      const imageData = await imageResponse.json();
      const urlCity = imageData.results[0].urls.full;
      setbackgrounImg(urlCity);

      //--------------images API--------------------------------------------------------------------
    } catch (error) {
      console.log(error);
      alert(`${search} is not a City`);
    }
  };

  //----------------get date and time from unix to date-------------------------------
  let riseTime = alldata.sunrise; //this is in unix in milliseconds
  let setTime = alldata.sunset; //this is in unix in milliseconds
  let riseConvert = new Date(riseTime * 1000);
  let setConvert = new Date(setTime * 1000);
  console.log(riseConvert.getMinutes());
  let riseResult = `${riseConvert.getHours()}:${riseConvert.getMinutes()}`;
  let setResult = `${setConvert.getHours()}:${setConvert.getMinutes()}`;
  //-------------get todays date and day----------------------------
  const dayArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthArr = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date();
  let todayDateMonth = `${dateObj.getDate()} ${monthArr[dateObj.getMonth()]} `;
  let todayDay = `${dayArr[dateObj.getDay()]} `;
  //-----------------------------------------
  const getVal = (e) => {
    let searchVal = e.target.value;
    setSearch(searchVal.toUpperCase());
  };
  //object
  const background = {
    backgroundImage: `url(${backgroundImg})`,
    height: "100vh",

    backgroundSize: "cover",
  };
  return (
    <>
      <div className="container-body" style={background}>
        <div className="sub-container-body">
          {/* search section */}
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Enter your city name"
              onChange={getVal}
              value={search}
            />
            <button className="btn-search" onClick={submit}>
              Search
            </button>
          </div>
          {/* data section */}
          <div className="data-container">
            <div className="first-row">
              <span className="date-month">{todayDateMonth}</span>
              <span className="day">{todayDay}</span>
            </div>

            <div className="second-row">
              <span className="city-name">
                {alldata.cityname} {alldata.country}
              </span>
            </div>

            <div className="third-row">
              <span className="temp">{alldata.temp}&deg;C</span>

              <img src={weatherImg} alt={weatherImg} />
              <span className="temp"> {alldata.mood}</span>
            </div>

            <div className="fourth-row">
              <span className="data-1">
                <img src={sunrise} alt="sunrise" />
                <div> Sunrise</div>
                <div>{riseResult} AM</div>
              </span>

              <span className="data-1">
                <img src={humidity} alt="humidity" />
                <div> Humidity</div>
                <div>{alldata.humidity}%</div>
              </span>

              <span className="data-1">
                <img src={wind} alt="wind" />
                <div> Wind Speed</div>
                <div>{alldata.speed} m/s</div>
              </span>

              <span className="data-1">
                <img src={sunset} alt="sunset" />
                <div> Sunset</div>
                <div>{setResult} PM</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
