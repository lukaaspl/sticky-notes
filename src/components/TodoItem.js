import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

import setColor from '../helpers/setColor';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 1;

  &:hover {
    background-color: ${({ color }) => setColor(color).listBackgroundHover};

    & .item-navbar > svg {
      pointer-events: all;
      transform: translateX(0);
    }
  }

  &:nth-child(even) {
    background-color: ${({ color }) => setColor(color).evenItemBackground};

    &:hover {
      background-color: ${({ color }) =>
        setColor(color).evenItemBackgroundHover};
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(121, 203, 202, 0.3); */
    /* background-color: rgba(122, 226, 153, 0.4); */
    background-color: rgba(144, 237, 172, 0.5);
    z-index: -1;
    transition: 0.5s;
    opacity: ${props => (props.isDone ? 1 : 0)};
  }
`;

const StyledDate = styled.div`
  font-style: italic;
  font-size: 12px;
  transition: transform 0.3s;
  transform: ${props => (props.isDone ? 'translateX(0)' : 'translateX(-20px)')};
`;

const StyledContent = styled.div`
  font-size: 15px;
  text-decoration: ${props => (props.isDone ? 'line-through' : 'none')};
  padding-right: 5px;
`;

const StyledNavDoneIcon = styled(FaCheckCircle)`
  color: darkgreen;
`;

const StyledNavUndoneIcon = styled(FaTimesCircle)`
  color: darkred;
`;

const StyledNavTrashIcon = styled(FaTrash)`
  color: #333;
`;

const StyledDoneIcon = styled(StyledNavDoneIcon)`
  font-size: 15px;
  margin-right: 5px;
  vertical-align: -2px;
  transform: ${props => (props.isDone ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s;
`;

const StyledNavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > svg {
    margin: 3px 0;
    font-size: 18px;
    cursor: pointer;
    opacity: 0.8;
    pointer-events: none;
    transform: translateX(200%);
    transition: transform 0.3s 0.1s;

    &:hover {
      opacity: 1;
    }
  }
`;

const TodoItem = ({ todo, index, color, changeItemState, removeItem }) => {
  return (
    <StyledWrapper isDone={todo.isDone} color={color}>
      <div>
        <StyledDate isDone={todo.isDone}>
          {<StyledDoneIcon isDone={todo.isDone} />}
          {todo.date}
        </StyledDate>
        <StyledContent isDone={todo.isDone}>{todo.content}</StyledContent>
      </div>
      <StyledNavBar className="item-navbar">
        {todo.isDone ? (
          <StyledNavUndoneIcon onClick={changeItemState.bind(this, index)} />
        ) : (
          <StyledNavDoneIcon onClick={changeItemState.bind(this, index)} />
        )}
        <StyledNavTrashIcon onClick={removeItem.bind(this, index)} />
      </StyledNavBar>
    </StyledWrapper>
  );
};

export default TodoItem;
