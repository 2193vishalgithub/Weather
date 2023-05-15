import { useState } from "react";
import "./App.css";

function App() {
  const [inpVal, setInpVal] = useState();
  const [temp, setTemp] = useState();
  const [cityName, setCityName] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [status, setStatus] = useState();
  const [statusImg, setStatusImg] = useState();

  const apiKey = "d00b88a7e3da604c4a87b9fc58b549cc";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBtn = async () => {
    try {
      const response = await fetch(apiUrl + inpVal + `&appid=${apiKey}`);
      const data = await response.json();
      console.log(data);

      setTemp(Math.round(data.main.temp) + "°C");
      setCityName(data.name);
      setHumidity(data.main.humidity + "%");
      setWindSpeed(data.wind.speed + "km/hr");

      setStatus(data.weather[0].main);

      console.log("status - " + status);
      console.log("cityName - " + cityName);
      updateStatusImg();
    } catch (err) {
      console.log(err);
    }
  };

  const inputEvent = (e) => {
    setInpVal(e.target.value);
  };

  const updateStatusImg = () => {
    if (status == "Clouds") {
      setStatusImg("images/clouds.png");
    } else if (status == "Clear") {
      setStatusImg("images/clear.png");
    } else if (status == "Rain") {
      setStatusImg("images/rain.png");
    } else if (status == "Drizzle") {
      setStatusImg("images/drizzle.png");
    } else if (status == "Mist") {
      setStatusImg("images/mist.png");
    }
  };

  return (
    <>
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="enter city name"
            spellCheck="false"
            onChange={inputEvent}
          />
          <button style={{ width: "40px", height: "40px" }} onClick={searchBtn}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="error">
          <p>Invalid City Name</p>
        </div>

        <div className="weather">
          <img className="weather-icon" src={statusImg} />
          <h1 className="temp">{temp}</h1>
          <h2 className="city">{cityName}</h2>

          <div className="details">
            <div className="col">
              <img src="images/humidity.png" alt="" />
              <div>
                <p className="humidity">{humidity}</p>
                <p className="humidity-name">Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="images/wind.png" alt="" />
              <div>
                <p className="wind">{windSpeed}</p>
                <p className="wind-name">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
