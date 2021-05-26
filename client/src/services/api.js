import { API_URL, get } from "./axiosConfig";

export const getCities = () => get(`${API_URL}/get-cities`);

export const getCurrentWeather = () => get(`${API_URL}/get-current-weather`);

export const getWeeklyWeatherByCity = id =>
  get(`${API_URL}/get-city-weather?placeId=${id}`);
