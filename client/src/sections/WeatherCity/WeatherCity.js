import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Card from "../../components/Card/Card";
import HourlyData from "../../components/HourlyData/HourlyData";

const WeatherPage = styled.div`
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
  min-height: 150px;
  margin-top: 16px;
  &:hover {
    background: aliceblue;
  }
`;

const WeatherCity = ({ weatherData, currentCity }) => {
  const [hourlyWeather, setHourlyWeather] = useState(null);

  return (
    <WeatherPage>
      <>
        {currentCity}
        <Card>
          {weatherData.map(data => (
            <CardStyled
              key={data.date}
              onClick={() => setHourlyWeather(data.hourly)}
            >
              <h3>{moment(data.date).format("MM/DD/YYYY")}</h3>
              {data._id ? (
                <>
                  <div>
                    {`${Math.max(...data.hourly)}°C`} /{" "}
                    {`${Math.min(...data.hourly)}°C`}
                  </div>
                  <div>Sky: {data.current.sky}</div>
                  <div>
                    Current temp.: {`${data.hourly[new Date().getHours()]}° C`}
                  </div>
                </>
              ) : (
                <div>No data for this day</div>
              )}
            </CardStyled>
          ))}
        </Card>
        {hourlyWeather && <HourlyData hourlyWeather={hourlyWeather} />}
      </>
    </WeatherPage>
  );
};

export default WeatherCity;
