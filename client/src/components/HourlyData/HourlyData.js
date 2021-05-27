import styled from "styled-components";

const HourlyBox = styled.div`
  display: flex;
  margin-top: 16px;
  overflow: auto;
  min-height: 50px;
`;

const HourData = styled.div`
  margin-right: 12px;
  font-size: 14px;
  min-width: 50px;
`;

const HourlyData = ({ hourlyWeather }) => {
  return (
    <HourlyBox>
      {hourlyWeather.map((weather, index) => (
        <HourData key={index}>{`${weather}°C at ${index}:00`}</HourData>
      ))}
    </HourlyBox>
  );
};

export default HourlyData;
