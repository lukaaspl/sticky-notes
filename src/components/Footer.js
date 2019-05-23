import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: fixed;
  right: 15px;
  bottom: 8px;
  font-size: 13px;
  opacity: 0.8;

  a {
    color: #ff2999;
    text-decoration: none;
    font-weight: bold;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => (
  <StyledWrapper>
    &copy; 2019 All notes arranged by{' '}
    <a
      href="https://github.com/lukaaspl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Łukasz Roman
    </a>
  </StyledWrapper>
);

export default Footer;
