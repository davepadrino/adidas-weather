import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Card from "../../components/Card/Card";
import { getWeeklyWeatherByCity } from "../../services/api";

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
  &:hover {
    background: aliceblue;
  }
`;

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

const WeatherCity = ({
  match: {
    params: { id }
  }
}) => {
  const [weatherData, setWeatherData] = useState();
  const getWeekWeatherData = async () => {
    try {
      const { data } = await getWeeklyWeatherByCity(id);
      // message if data is empty
      //   const arrayOfFormattedData = data.data.map(individualDate =>
      //     moment(individualDate)
      //   );
      setWeatherData(data.data);
    } catch (error) {
      // notification
      console.log(error);
    }
  };

  console.log(weatherData);

  useEffect(() => {
    getWeekWeatherData();
  }, []);

  // PENDING: Check if certain date is in the array so we can put a message like "No data for this day"
  return (
    <WeatherPage>
      {weatherData ? (
        <Card>
          {getDates().map(date => {
            return (
              <CardStyled key={date} onClick={() => console.log("jeje")}>
                <h3>{moment(date).format("MM/DD/YYYY")}</h3>
                {weatherData.map(data => {
                  console.log(getDates().indexOf(data.date));
                  if (moment(date).isSame(moment(data.date))) {
                    return (
                      <>
                        <div>
                          {`${Math.max(...data.hourly)}°C`} /{" "}
                          {`${Math.min(...data.hourly)}°C`}
                        </div>
                        <div>Sky: {data.current.sky}</div>
                        <div>Current temp.: {data.current.temperature}</div>
                      </>
                    );
                  }
                })}
              </CardStyled>
            );
          })}
        </Card>
      ) : (
        "Loading...."
      )}
    </WeatherPage>
  );
};

export default WeatherCity;
