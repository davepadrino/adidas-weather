import { useState, useEffect } from "react";
import Home from "./Home";
import { getCities, getCurrentWeather } from "../../services/api";

const HomeContainer = () => {
  const [cities, setCities] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [noWeatherDataMessage, setNoWeatherDataMessage] = useState(null);

  const getCitiesService = async () => {
    try {
      const { data } = await getCities();
      const parsedCities = data.cities.map(city => ({
        city: city.location.city,
        country: city.location.country,
        id: city.location.id
      }));
      setCities(parsedCities);
    } catch (error) {
      // notification
      console.log(error);
    }
  };

  const getCurrentDateData = async () => {
    try {
      const { data } = await getCurrentWeather();
      if (data.data instanceof Array) {
        setCurrentWeather(data.data);
      } else {
        setNoWeatherDataMessage(data.data);
      }
    } catch (error) {
      // notification
      console.log(error);
    }
  };

  useEffect(() => {
    getCitiesService();
    getCurrentDateData();
  }, []);

  return (
    (currentWeather || noWeatherDataMessage) && (
      <Home
        cities={cities}
        noWeatherDataMessage={noWeatherDataMessage}
        currentWeather={currentWeather}
      />
    )
  );
};

export default HomeContainer;
