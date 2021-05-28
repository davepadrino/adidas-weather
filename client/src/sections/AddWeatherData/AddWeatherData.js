import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Dropdown from "../../components/Dropdown/Dropdown";

const Container = styled.div`
  margin-top: 32px;
  padding: 0 16px;
`;

const HourlyFields = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Fields = styled.div`
  margin: 8px;
`;

const Input = styled.input`
  width: 30px;
`;

const Options = styled.div`
    max-width: 200px;
    height: 20px;
    border: 1px solid gray;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
        &: hover {
            background-color: aliceblue;
        }
    }
`;

const ErrorText = styled.p`
  color: red;
`;

const SuccessText = styled.p`
  color: green;
`;

const Button = styled.button``;

const availableSkies = ["clear", "cloudy", "rainy", "sunny"];
const initialState = {
  location: {},
  hourly: new Array(24).fill(""),
  date: "",
  current: {}
};

const AddWeatherData = ({ cities, getCityFromSearch, postNewWeatherData }) => {
  const [weatherData, setWeatherData] = useState({
    location: {},
    hourly: new Array(24).fill(""),
    date: "",
    current: {}
  });
  const [searchedCity, setSearchedCity] = useState("");
  const [citiesOptions, setCitiesOptions] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState();
  const hourlyData = weatherData.hourly;

  const onClickNewCity = newCity => {
    setCitiesOptions();
    const cityInExistingCities = cities.find(
      existingCity => existingCity.id === newCity.id
    );
    if (cityInExistingCities) {
      setErrorMessage(
        "City already exists, please select it from the dropdown"
      );
    } else {
      const newCityCountry = `${newCity.city}, ${newCity.country}`;
      setSearchedCity(newCityCountry);
      setWeatherData({
        ...weatherData,
        location: newCity
      });
    }
  };

  const fetchNewCity = async () => {
    setCitiesOptions();
    setErrorMessage();
    const data = await getCityFromSearch(searchedCity);
    const parseCities = data.list.map(({ name, sys, id }) => ({
      city: name,
      country: sys.country,
      id
    }));

    setCitiesOptions(parseCities);
  };

  const disabledSubmit =
    errorMessage ||
    weatherData.hourly.includes("") ||
    !weatherData.date ||
    !weatherData.location.id;

  useEffect(() => {
    setSuccess();
    setErrorMessage();
  }, [weatherData]);

  return (
    <Container>
      <Dropdown
        options={cities}
        onClick={city => {
          setWeatherData({
            ...weatherData,
            location: city
          });
        }}
      />
      <div>
        <label htmlFor="city">(Not in the list?) Search city: </label>
        <input
          name="city"
          onChange={e => {
            setSearchedCity(e.target.value);
            setErrorMessage();
          }}
          value={searchedCity}
        />
        <button disabled={!searchedCity} onClick={() => fetchNewCity()}>
          Search City
        </button>
      </div>
      {citiesOptions &&
        citiesOptions.map(city => (
          <Options
            key={city.id}
            onClick={() => onClickNewCity(city)}
          >{`${city.city}, ${city.country}`}</Options>
        ))}
      <div>
        <ErrorText>{errorMessage}</ErrorText>
        <SuccessText>{success}</SuccessText>
      </div>
      <div>
        <label htmlFor="sky">Sky: </label>
        <select
          value={weatherData.current.sky}
          onChange={e =>
            setWeatherData({
              ...weatherData,
              current: { sky: e.target.value }
            })
          }
        >
          {availableSkies.map(sky => (
            <option key={sky} value={sky}>
              {sky.charAt(0).toUpperCase() + sky.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date">Date: </label>
        <input
          name="date"
          onChange={e =>
            setWeatherData({
              ...weatherData,
              date: e.target.value ? moment(e.target.value).toDate() : ""
            })
          }
          type="date"
        />
      </div>
      <HourlyFields>
        {hourlyData.map((_, index) => (
          <Fields key={index}>
            <label htmlFor={index}>{index}:00 hrs.</label>
            <Input
              maxLength={4}
              name={index}
              value={weatherData.hourly[index]}
              onChange={e => {
                hourlyData[index] = Number(e.target.value);
                setWeatherData({ ...weatherData, hourly: hourlyData });
              }}
            />
          </Fields>
        ))}
      </HourlyFields>
      <Button
        disabled={disabledSubmit}
        onClick={async () => {
          const response = await postNewWeatherData(weatherData);
          if (response.ok) {
            setWeatherData(initialState);
            setSuccess("Created!");
          } else {
            setErrorMessage(response.error);
          }
        }}
      >
        Add weather data
      </Button>
    </Container>
  );
};

export default AddWeatherData;
