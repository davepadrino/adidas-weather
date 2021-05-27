import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import Card from "../../components/Card/Card";
import HourlyData from "../../components/HourlyData/HourlyData";

const HomeBox = styled.div`
  margin-top: 32px;
  padding: 0 16px;
`;

const CardStyled = styled.div`
  border: 1px solid;
  padding: 8px;
  border-radius: 20px;
  min-width: 150px;
  cursor: pointer;
  margin-right: 16px;
  &:hover {
    background: aliceblue;
  }
`;

const Home = ({ cities, noWeatherDataMessage, currentWeather }) => {
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const history = useHistory();

  return (
    <HomeBox>
      Select a city to see this week weather
      <Dropdown
        options={cities}
        onClick={({ id }) => history.push(`/city/${id}/week`)}
      />
      {noWeatherDataMessage ? (
        <h1>{noWeatherDataMessage}</h1>
      ) : (
        <>
          <Card>
            {currentWeather.map(({ current, hourly, location, _id }) => {
              return (
                <CardStyled key={_id} onClick={() => setHourlyWeather(hourly)}>
                  <h2>
                    {location.city}, {location.country}
                  </h2>
                  <div>
                    {`${Math.max(...hourly)}°C`} / {`${Math.min(...hourly)}°C`}
                  </div>
                  <div>Sky: {current.sky}</div>
                  <div>
                    Current temp.: {`${hourly[new Date().getHours()]}° C`}
                  </div>
                </CardStyled>
              );
            })}
          </Card>
          {hourlyWeather && <HourlyData hourlyWeather={hourlyWeather} />}
        </>
      )}
    </HomeBox>
  );
};

Home.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      city: PropTypes.string,
      country: PropTypes.string
    })
  ),
  noWeatherDataMessage: PropTypes.string,
  currentWeather: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.shape({
        temperature: PropTypes.number,
        sky: PropTypes.string
      }),
      hourly: PropTypes.arrayOf(PropTypes.number),
      location: PropTypes.shape({
        id: PropTypes.number,
        city: PropTypes.string,
        country: PropTypes.string
      }),
      _id: PropTypes.string
    })
  )
};

export default Home;
