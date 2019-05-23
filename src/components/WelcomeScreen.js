import React, { useEffect } from 'react';
import styled from 'styled-components';

import notes from '../assets/notes.png';
import storage from '../helpers/storage';
import titleAnimation from '../helpers/titleAnimation';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0
  bottom: 0;
  z-index: -10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  opacity: 0.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  position: relative;
  user-select: none;
  pointer-events: none;
  ${({ active }) =>
    active
      ? 'filter: grayscale(1); transform: scale(2); opacity: .07;'
      : titleAnimation}
`;

const Image = styled.img`
  position: absolute;
  z-index: -1;
  left: 50%;
  transform: translate(-50%, -85px) rotate(35deg);
`;

const Span = styled.span`
  color: ${({ color }) => color};
`;

const WelcomeScreen = ({ active }) => {
  useEffect(() => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.addEventListener('animationend', storage.setWelcomeScreen);
  });

  return (
    <Overlay>
      <Title active={active} id="welcomeScreen">
        <Image src={notes} alt="notes" />
        <Span color="#A527FF">Sticky</Span>
        <Span color="#FF2999">Notes</Span>
        <Span color="#2A3A3B">.</Span>
        <Span color="#FFE400">js</Span>
      </Title>
    </Overlay>
  );
};

export default WelcomeScreen;
