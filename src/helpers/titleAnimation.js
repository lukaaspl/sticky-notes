import { keyframes, css } from 'styled-components';

const animation = keyframes`
  0% {
    opacity: 0;
    filter: grayscale(0);
    transform: scale(1);
  }

  5% {
    opacity: 0;
    filter: grayscale(0);
    transform: scale(1);
  }

  20% {
    opacity: 1;
    filter: grayscale(0);
    transform: scale(1);
  }

  45% {
    opacity: 1;
    filter: grayscale(0);
    transform: scale(1);
  }

  

  100% {
    filter: grayscale(1);
    transform: scale(2);
    opacity: .07;
  }
`;

const titleAnimation = css`
  animation: ${animation} 4s ease both;
`;

export default titleAnimation;
