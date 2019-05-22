import React, { Component } from 'react';
import styled from 'styled-components';
import { FaWindowMaximize, FaGripVertical } from 'react-icons/fa';

import setColor from '../helpers/setColor';

const StyledWrapper = styled.div`
  position: relative;
  height: 35px;
  border-radius: 5px 5px 0 0;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: move;

  h2 {
    color: #eee;
    text-align: center;
    line-height: 35px;
    user-select: none;
    font-size: 15px;
  }

  svg {
    color: #eee;
    position: absolute;
    font-size: 15px;
    cursor: pointer;
    top: 50%;

    :hover {
      color: ${({ color }) => setColor(color).navIconsHover};
    }
  }
`;

const MaximizeButton = styled(FaWindowMaximize)`
  right: 10px;
  transform: ${props =>
    props.isMinimized
      ? 'translateY(-50%) rotateX(180deg)'
      : 'translateY(-50%)'};
  transition: transform 0.3s;
`;

const ToggleMenuButton = styled(FaGripVertical)`
  left: 10px;
  transform: translateY(-50%);
  z-index: 4;
`;

class WindowHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWindowGrabbed: false
    };

    this.windowRef = this.props.windowRef;
    this.color = this.props.color;
    this.setTransform = this.props.setTransform;
  }

  handleWindowGrab = e => {
    if (e.target.tagName !== 'H2') return false;

    this.setState({ isWindowGrabbed: true });
    this.windowInnerOffsetX = e.nativeEvent.offsetX;
    this.windowInnerOffsetY = e.nativeEvent.offsetY;
  };

  handleWindowMove = e => {
    if (!this.state.isWindowGrabbed) return false;

    const [cursorX, cursorY] = [e.clientX, e.clientY];
    const windowOffsetX = cursorX - this.windowInnerOffsetX;
    const windowOffsetY = cursorY - this.windowInnerOffsetY;

    this.windowRef.current.style.transform = `
    translate(${windowOffsetX}px, ${windowOffsetY}px)`;
  };

  handleWindowRelase = e => {
    if (e.target.tagName !== 'H2') return false;

    const [cursorX, cursorY] = [e.clientX, e.clientY];
    const windowOffsetX = cursorX - this.windowInnerOffsetX;
    const windowOffsetY = cursorY - this.windowInnerOffsetY;

    this.setTransform({ x: windowOffsetX, y: windowOffsetY });
    this.setState({ isWindowGrabbed: false });
  };

  render() {
    if (this.state.isWindowGrabbed)
      window.addEventListener('mousemove', this.handleWindowMove);
    else window.removeEventListener('mousemove', this.handleWindowMove);

    const windowName = this.props.children;

    return (
      <StyledWrapper
        onMouseDown={this.handleWindowGrab}
        onMouseUp={this.handleWindowRelase}
        color={this.color}
      >
        <h2>{windowName}</h2>
        <ToggleMenuButton onClick={this.props.toggleMenu} />
        <MaximizeButton
          onClick={this.props.changeViewState}
          isMinimized={this.props.isMinimized}
        />
      </StyledWrapper>
    );
  }
}

export default WindowHeader;
