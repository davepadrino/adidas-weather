const express = require("express");
const app = express();
const {
  getAllData,
  addWeatherData,
  getAllCities,
  getWeatherByCityId,
  getHistoricWeatherByCity,
  softDeleteRecord
} = require("./weather");

// API routes
app.get("/get-all-data", getAllData);
app.post("/add-weather-data", addWeatherData);
app.get("/get-cities", getAllCities);
app.get("/get-city-weather", getWeatherByCityId);
app.get("/get-historic-weather-city", getHistoricWeatherByCity);
app.patch("/delete-record", softDeleteRecord);

module.exports = app;
