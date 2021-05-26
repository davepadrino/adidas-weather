import { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  width: 10.5em;
  margin: 0 auto;
  height: 50px;
`;

const DropDownHeader = styled("div")`
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  background: #ffffff;
  cursor: pointer;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    top: ${({ isOpen }) => (isOpen ? "7px" : "14px")};
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: ${({ isOpen }) =>
      isOpen
        ? "transparent transparent #000 transparent"
        : "#000 transparent transparent transparent"};
  }
`;
const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
  &: hover {
    color: gray;
  }
`;

const Dropdown = ({ options, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onClick(value.id);
  };

  return (
    <DropdownContainer>
      <DropDownHeader onClick={toggling} isOpen={isOpen}>
        {selectedOption || "Select City:"}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map(option => (
              <ListItem onClick={onOptionClicked(option)} key={option.id}>
                {`${option.city}, ${option.country}`}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
