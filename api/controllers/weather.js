const moment = require("moment");
const Weather = require("../models/weather");
const errorHandler = require("../helpers/errorHandlerHelper");

/**
 * Get all the weather data paginated by 10 elements
 */
const getAllData = (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);

  try {
    Weather.find({ active: true }, (err, data) => {
      if (err) {
        return errorHandler(res, err);
      }

      return res.json({ ok: true, data });
    })
      .skip(from)
      .limit(10);
  } catch (error) {
    return errorHandler(res, error);
  }
};

/**
 * Add new record with the city - date relation
 */
const addWeatherData = (req, res) => {
  const {
    date,
    location: { city, country },
    current: { sky, temperature },
    hourly
  } = req.body;
  Weather.findOne(
    {
      date,
      "location.city": city,
      "location.country": country
    },
    (error, data) => {
      if (error) {
        return errorHandler(res, error);
      }

      if (data) {
        return errorHandler(
          res,
          "Weather for current city-country and date already exists"
        );
      }

      const weather = new Weather({
        location: {
          city,
          country
        },
        current: {
          sky,
          temperature
        },
        hourly,
        date
      });

      weather.save((err, newWeather) => {
        if (err) {
          // Specific message for schema valitadion error
          if (err.name === "ValidationError") {
            return errorHandler(
              res,
              `${err._message}: "${
                err.errors["current.sky"].value
              } is not a valid value. Select between "${err.errors[
                "current.sky"
              ].properties.enumValues.join(", ")}."`
            );
          } else {
            return errorHandler(res, err._message);
          }
        }

        return res.json({ ok: true, data: newWeather });
      });
    }
  );
};

/**
 * Return all cities to fill dropdown of cities
 */
const getAllCities = (_, res) => {
  try {
    Weather.aggregate(
      [
        {
          $unwind: "$location"
        },
        {
          $group: {
            _id: "$location.id",
            location: {
              $first: "$location"
            }
          }
        }
      ],
      (error, cities) => {
        if (error) {
          return errorHandler(res, error);
        }

        return res.json({ ok: true, cities });
      }
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};

/**
 * Get weather info by city in the current week (current date + 7 days)
 */
const getWeatherByCityId = (req, res) => {
  const placeId = req.query.placeId;
  const start = moment().startOf("week");
  const end = moment().endOf("week");

  try {
    Weather.find(
      {
        "location.id": placeId,
        date: { $gte: start, $lte: end }
      },
      (error, data) => {
        if (error) {
          return errorHandler(res, error);
        }

        return res.json({
          ok: true,
          data
        });
      }
    ).limit(8);
  } catch (error) {
    return errorHandler(res, error);
  }
};

/**
 * Get historic weather by city
 */
const getHistoricWeatherByCity = (req, res) => {
  const placeId = req.query.placeId;
  try {
    Weather.find(
      {
        "location.id": placeId
      },
      (error, data) => {
        if (error) {
          return errorHandler(res, error);
        }

        return res.json({
          ok: true,
          data
        });
      }
    ).limit(12);
  } catch (error) {
    return errorHandler(res, error);
  }
};

/**
 * Get today's weather for different cities
 */
const getCurrentWeather = (_, res) => {
  const start = moment().startOf("day");
  const end = moment().endOf("day");
  try {
    Weather.find({ date: { $gte: start, $lt: end } }, (error, data) => {
      if (error) {
        return errorHandler(res, error);
      }
      if (!data.length) {
        return res.json({
          ok: true,
          data: "No data found for today's weather"
        });
      }

      return res.json({
        ok: true,
        data
      });
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

// Soft delete a record.
const softDeleteRecord = (req, res) => {
  const id = req.query.id;
  try {
    Weather.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
      (error, data) => {
        if (error) {
          return errorHandler(res, error.message);
        }
        res.json({ ok: true, data });
      }
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = {
  getAllData,
  addWeatherData,
  getAllCities,
  getWeatherByCityId,
  getHistoricWeatherByCity,
  getCurrentWeather,
  softDeleteRecord
};
