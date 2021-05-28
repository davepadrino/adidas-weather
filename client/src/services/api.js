import axios from "axios";
import { API_URL, get, post, remove } from "./axiosConfig";

export const getCityFromApi = place =>
  axios.get(
    `http://api.openweathermap.org/data/2.5/find?q=${place}&appid=${process.env.REACT_APP_apiKey}`
  );

export const getCities = () => get(`${API_URL}/get-cities`);

export const getCurrentWeather = () => get(`${API_URL}/get-current-weather`);

export const getWeeklyWeatherByCity = id =>
  get(`${API_URL}/get-city-weather?placeId=${id}`);

export const addWeatherData = data => post(`${API_URL}/add-weather-data`, data);

export const wipeData = () => remove(`${API_URL}/snap`);
