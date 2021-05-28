import { useState, useEffect } from "react";
import AddWeatherData from "./AddWeatherData";
import { getCities, getCityFromApi, addWeatherData } from "../../services/api";

const AddWeatherDataContainer = () => {
  const [cities, setCities] = useState();

  const getCityFromSearch = async searchedCity => {
    try {
      const { data } = await getCityFromApi(searchedCity);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const postNewWeatherData = async data => {
    try {
      const response = await addWeatherData(data);
      return response.data;
    } catch (error) {
      // Notification
      console.log(error.response.data.error);
      return { ok: false, error: error.response.data.error };
    }
  };

  useEffect(() => {
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
    getCitiesService();
  }, []);

  return (
    <AddWeatherData
      cities={cities}
      getCityFromSearch={getCityFromSearch}
      postNewWeatherData={postNewWeatherData}
    />
  );
};

export default AddWeatherDataContainer;
