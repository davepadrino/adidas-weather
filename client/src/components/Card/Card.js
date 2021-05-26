import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const Card = ({ children }) => {
  return (
    <CardContainer>
      <>{children}</>
    </CardContainer>
  );
};

export default Card;
