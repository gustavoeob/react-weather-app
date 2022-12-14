import "./current-weather.scss";

const CurrentWeather = ({data}) => {

  return (
    <section className="current-weather-box">
      <h2 className={`color-${data.weather[0].icon}`}>Current weather</h2>
      <section className="weather-widget">
        <div className="widget-top-box">
          <div className="weather-location">
            <p className="city">{data.city}</p>
            <p className="weather-condition">{data.weather[0].description}</p>
          </div>
          <div className="weather-icon-box">
            <img
              src={`assets/icons/${data.weather[0].icon}.gif`}
              alt="weather"
              className="weather-icon"
            />
          </div>
        </div>
        <div className="widget-middle-box">
          <div className="weather-time">
            <div className="min-max-box">
              <span className="">min {Math.floor(data.main.temp_min)}°C </span>
              <br />
              <span className="">max {Math.ceil (data.main.temp_max)}°C </span>
            </div>
          </div>
          <div className="temperature-box">
            <span className="temperature">{Math.round(data.main.temp)}</span>
            <span className="temperature-scale">°C</span>
          </div>
        </div>
        <div className="widget-bottom-box">
          <div className="weather-details">
            <div className="params-one">
              <p className="param-label">Details</p>
            </div>
            <div className="params">
              <p className="param-label">Feels like</p>
              <p className="param-value">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="params">
              <p className="param-label">Wind</p>
              <p className="param-value">{data.wind.speed} m/s</p>
            </div>
            <div className="params">
              <p className="param-label">Humidity</p>
              <p className="param-value">{data.main.humidity}%</p>
            </div>
            <div className="params">
              <p className="param-label">Pressure</p>
              <p className="param-value">{data.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CurrentWeather;
