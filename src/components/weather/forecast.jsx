import React from "react";
import "./forecast.scss";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const DAYS_OF_THE_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data, curr }) => {
  /* Getting the current day of the week. */
  const dayInAWeek = new Date().getDay();
  /* Getting the current day of the week and then slicing the array of days of the week to get the days
of the week starting from the current day. */
  const forecastDays = DAYS_OF_THE_WEEK.slice(
    dayInAWeek,
    DAYS_OF_THE_WEEK.length
  ).concat(DAYS_OF_THE_WEEK.slice(0, dayInAWeek));

  return (
    <>
      <Accordion allowZeroExpanded>
        <h2 className={`color-${curr.weather[0].icon}`}>
          Daily forecast
        </h2>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item-box">
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="weather-icon-sm"
                      src={`assets/icons/${item.weather[0].icon}.gif`}
                    />
                    <label className="forecast-day">
                      {forecastDays[index]}
                    </label>
                  </div>
                  <div className="forecast-temp">
                    <label className="forecast-conditions">
                      {item.weather[0].description}
                    </label>
                    <label className="forecast-min-max">
                      {Math.round(item.main.temp_min)}°C /{" "}
                      {Math.round(item.main.temp_max)}°C
                    </label>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="panel-box">
                <span>Pressure {item.main.pressure} hPa</span>
                <span> Humidity {item.main.humidity}% </span>
                <span> Wind {item.wind.speed}m/s</span>
                <span>Will feel like {Math.round(item.main.feels_like)}°C</span>
                
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
