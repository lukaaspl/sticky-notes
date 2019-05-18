import React from 'react';
import styled from 'styled-components';

import setColor from '../helpers/setColor';

const StyledBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background-color: ${props => props.color}; */
  background-image: ${({ color }) => setColor(color).gradientIcon};
  margin: 0 7px;
  cursor: pointer;
  /* box-shadow: 0 0 0 2px transparent; */
  box-shadow: ${({ picked }) =>
    picked ? '0 0 0 2px rgba(0, 0, 0, .7)' : '0 0 0 2px transparent'};
  transition: box-shadow 0.2s;

  :hover {
    ${props => (props.picked ? '' : 'box-shadow: 0 0 0 2px rgba(0, 0, 0, .5)')};
  }

  ::before {
    content: '${props => props.colorLabel}';
    position: absolute;
    top: -128%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 13px;
    border-radius: 10px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding: 0 5px;
    transition: transform .2s, opacity .2s;

    opacity: ${props => (props.picked ? 1 : 0)};
    transform: ${props =>
      props.picked ? 'translate(-50%, 0)' : 'translate(-50%, 10px)'};
    pointer-events: none;
  }

  ::after {
    content: '';
    position: absolute;
    top: calc(-128% + 20px);
    left: 50%;
    /* transform: translate(-50%, 100%); */
    border-top: 5px solid rgba(0, 0, 0, 0.6);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transition: transform .2s, opacity .2s;
    opacity: ${props => (props.picked ? 1 : 0)}
    transform: ${props =>
      props.picked
        ? 'translate(-50%, 100%)'
        : 'translate(-50%, calc(100% + 10px))'};
  }
`;

const ColorBox = ({ id, name, picked, pickColor }) => {
  return (
    <>
      <StyledBox
        colorLabel={name}
        color={name}
        picked={picked}
        onClick={pickColor.bind(this, id, name)}
      />
    </>
  );
};

export default ColorBox;
