import { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(109, 35, 69,.5);
  }

  70% {
    box-shadow: 0 0 0 13px rgba(109, 35, 69, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(109, 35, 69, 0);
  }
`;

const PulseAnimation = () => css`
  animation: ${pulse} 1s 0.1s infinite;
`;

export default PulseAnimation;
