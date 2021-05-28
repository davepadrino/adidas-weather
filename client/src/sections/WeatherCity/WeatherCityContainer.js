import { useState, useEffect } from "react";
import moment from "moment";
import WeatherCity from "./WeatherCity";
import { getWeeklyWeatherByCity } from "../../services/api";

const getDates = () => {
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, "d");
  }

  return days;
};

const parsedWeekWeather = (index, data) =>
  getDates().map(date => {
    const daylyDate = data[index]?.date;
    if (
      daylyDate &&
      moment(daylyDate)
        .toDate()
        .toString() === date.toString()
    ) {
      const currentData = data[index];
      index++;
      return currentData;
    }
    return {
      date,
      data: null
    };
  });

const WeatherCityContainer = ({
  match: {
    params: { id }
  }
}) => {
  const [weatherData, setWeatherData] = useState();
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    const getWeekWeatherData = async () => {
      try {
        const { data } = await getWeeklyWeatherByCity(id);
        let index = 0;
        setCurrentCity(
          `${data.data[0].location.city}, ${data.data[0].location.country}`
        );
        setWeatherData(parsedWeekWeather(index, data.data));
      } catch (error) {
        // notification
        console.log(error);
      }
    };
    getWeekWeatherData();
    const timer = setInterval(() => {
      getWeekWeatherData();
    }, 20000);
    return () => clearInterval(timer);
  }, [id]);

  return (
    <div>
      {weatherData ? (
        <WeatherCity weatherData={weatherData} currentCity={currentCity} />
      ) : (
        "Loading...."
      )}
    </div>
  );
};

export default WeatherCityContainer;
