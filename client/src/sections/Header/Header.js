import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 2px;
  height: 60px;
  position: relative;
  display: flex;
  padding: 16px;
  & nav {
    width: 100%;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  }
  & a,
  button {
    text-decoration: none;
    color: rgb(102, 102, 102);
  }
  & li {
    padding: 8px;
  }
`;

/**
 * App header
 */
const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <MenuList>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add data</Link>
          </li>
          <li>
            <Link to="/remove-all-data">Remove all data</Link>
          </li>
        </MenuList>
      </nav>
      {moment(new Date()).format("dddd, MMMM Do YYYY")}
    </HeaderContainer>
  );
};

export default Header;
