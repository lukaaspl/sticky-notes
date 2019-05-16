import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  transition: opacity 0.2s;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'all' : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PromptWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 345px;
  min-height: 185px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 4px solid #63b4b7;
  border-radius: 8px;
  padding: 18px;
  transition: transform 0.3s, opacity 0.2s;
  transition-delay: 0.1s;
  box-shadow: 0 3px 15px 5px rgba(0, 0, 0, 0.35);
  pointer-events: ${props => (props.isVisible ? 'all' : 'none')};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props =>
    props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
`;

const StyledMessage = styled.p`
  font-size: 18px;
  color: #222;
  line-height: 1.8;

  span {
    background-color: #79c8cb;
    padding: 1px 4px;
    border-radius: 4px;
    margin-right: 3px;
    font-weight: bold;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
`;

const Button = styled.button`
  position: relative;
  margin-left: 7px;
  border: 2px solid;
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  opacity: 0.9;
  font-weight: bold;
  transition: opacity 0.2s;
  box-shadow: 0 3px 5px -2px rgba(0, 0, 0, 0.2);
  border-color: ${props => (props.suggested ? '#63b4b7' : '#666')};
  background-color: ${props => (props.suggested ? '#a2e2e5' : 'transparent')};
  color: ${props => (props.suggested ? '#0b7a7f' : '#222')};
  z-index: 2;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transition: opacity 0.2s;
  }

  :hover {
    opacity: 1;

    ::before {
      opacity: 1;
    }
  }
`;

const Prompt = ({ isVisible, removePrompt, listToRemove, removeList }) => {
  return (
    <Overlay isVisible={isVisible} onClick={removePrompt} id="overlay">
      <PromptWindow isVisible={isVisible}>
        {isVisible && (
          <>
            <StyledMessage>
              Are you sure you want to delete list{' '}
              <span>{listToRemove.name}</span>?
            </StyledMessage>
            <ButtonsWrapper>
              <Button onClick={removeList}>Confirm</Button>
              <Button suggested onClick={removePrompt} id="rejectConfirmation">
                Cancel
              </Button>
            </ButtonsWrapper>
          </>
        )}
      </PromptWindow>
    </Overlay>
  );
};

export default Prompt;
