import React, { useState } from 'react';
import { FaTrash as TrashIcon } from 'react-icons/fa';
import styled from 'styled-components';

import AddTodoForm from '../containers/AddTodoForm';
import TodoItem from '../components/TodoItem';
import WindowHeader from '../containers/WindowHeader';
import setColor from '../helpers/setColor';
import storage from '../helpers/storage';

const StyledWrapper = styled.div`
  position: absolute;
  width: 350px;
  border-radius: 5px;
  box-shadow: 0 6px 7px -2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ color }) => setColor(color).listBackground};
  opacity: ${({ isWindowActive }) => (isWindowActive ? 1 : 0.7)};
  z-index: ${({ isWindowActive }) => (isWindowActive ? 2 : 1)};
  cursor: ${({ isWindowActive }) => (isWindowActive ? 'default' : 'pointer')};
  max-height: ${({ isMinimized }) => (isMinimized ? '35px' : '100vh')};
  transition: opacity 0.2s,
    max-height ${({ isMinimized }) => (isMinimized ? '0.3s' : '1s')};
  ${({ position }) => position};
`;

const StyledItems = styled.div`
  flex-grow: 1;
`;

const StyledParagraph = styled.p`
  margin: 22px 0 15px;
  text-align: center;
  opacity: 0.1;
  font-size: 24px;
`;

const StyledMenu = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0 0 10px 0;
  background-color: rgba(0, 0, 0, 0.9);
  transform: ${props => (props.isMenuToggled ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  z-index: 2;
  transition: transform 0.2s;
  padding: 45px 15px 10px 10px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);

  div {
    color: #ddd;
    cursor: pointer;
    transition: color 0.2s;

    :hover {
      color: #fff;
    }
  }

  svg {
    margin-right: 6px;
    vertical-align: -1px;
  }
`;

const TodoList = ({
  name,
  id,
  color,
  placeholder,
  actionMessage,
  isWindowActive,
  active,
  confirmRemovingList
}) => {
  const [todos, setTodos] = useState(
    storage.getItems(id) ? storage.getItems(id) : []
  );
  const [minimized, setMinimized] = useState(
    storage.getListViewState(id)
      ? storage.getListViewState(id) === 'true'
      : false
  );
  const [menuToggled, setMenuToggled] = useState(false);
  const [transform, setPosition] = useState(
    storage.getListPosition(id) ? storage.getListPosition(id) : false
  );
  const windowRef = useState(React.createRef())[0];

  const handleAddTodoItem = content => {
    const newId =
      todos.length > 0 ? parseInt(todos[todos.length - 1].id + 1) : 1;
    const newTodos = [
      ...todos,
      {
        id: newId,
        content,
        date: new Date().toLocaleString(),
        isDone: false
      }
    ];

    setTodos(newTodos);
    storage.saveItems(id, newTodos);
  };

  const handleChangeItemState = index => {
    const newTodos = [...todos];

    newTodos[index].isDone = !newTodos[index].isDone;

    setTodos(newTodos);
    storage.saveItems(id, newTodos);
  };

  const handleRemoveItem = index => {
    const newTodos = [...todos];

    newTodos.splice(index, 1);

    setTodos(newTodos);
    storage.saveItems(id, newTodos);
  };

  const handleChangeViewState = () => {
    if (menuToggled) setMenuToggled(!menuToggled);

    setMinimized(!minimized);
    storage.saveListViewState(id, !minimized);
  };

  const handleToggleMenu = () => {
    if (minimized) {
      setMinimized(!minimized);
      storage.saveListViewState(id, !minimized);
    }

    setMenuToggled(!menuToggled);
  };

  const handleSetTransform = ({ x, y }) => {
    setPosition({ x, y });

    x && y && storage.saveListPosition(id, { x, y });
  };

  const getWindowPosition = () => {
    if (transform)
      return `transform: translate(${transform.x}px, ${transform.y}px)`;

    const screenCenter = {
      x: Math.floor(window.innerWidth / 2),
      y: Math.floor(window.innerHeight / 2)
    };

    return `transform: translate(
      calc(${screenCenter.x}px - 50%), 
      calc(${screenCenter.y}px - 50%)
    )`;
  };

  return (
    <StyledWrapper
      ref={windowRef}
      onMouseDown={active}
      isWindowActive={isWindowActive}
      isMinimized={minimized}
      color={color}
      position={getWindowPosition()}
    >
      <WindowHeader
        windowRef={windowRef}
        changeViewState={handleChangeViewState}
        isMinimized={minimized}
        toggleMenu={handleToggleMenu}
        color={color}
        transform={transform}
        setTransform={handleSetTransform}
      >
        {name}
      </WindowHeader>
      <StyledMenu isMenuToggled={menuToggled}>
        <div onClick={confirmRemovingList.bind(this, id, name)}>
          <TrashIcon />
          Remove
        </div>
      </StyledMenu>
      <StyledItems>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              color={color}
              index={index}
              changeItemState={handleChangeItemState}
              removeItem={handleRemoveItem}
            />
          ))
        ) : (
          <StyledParagraph>{actionMessage}</StyledParagraph>
        )}
      </StyledItems>
      <AddTodoForm addItem={handleAddTodoItem} placeholder={placeholder} />
    </StyledWrapper>
  );
};

export default TodoList;
