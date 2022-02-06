import React from "react";
import ticketsImage from "./../img/tickets.png";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const HelpQueueHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: lightblue;
`;

const StyledWrapper = styled.section`
  background-color: orange;
`;

function Header(){
  return (
    <StyledWrapper>
    <React.Fragment>
      <HelpQueueHeader>
          Help Queue
        </HelpQueueHeader>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
      <img src={ticketsImage} alt="An image of tickets" />
    </React.Fragment>
    </StyledWrapper>
  );
}

export default Header;