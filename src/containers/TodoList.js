import React, { useState } from 'react';
import styled from 'styled-components';
import AddTodoForm from '../containers/AddTodoForm';
import TodoItem from '../components/TodoItem';
import WindowHeader from '../containers/WindowHeader';
import { FaTrash as TrashIcon } from 'react-icons/fa';

const StyledWrapper = styled.div`
  position: absolute;
  width: 350px;
  border-radius: 5px;
  background-color: #add8e6;
  box-shadow: 0 6px 7px -2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: ${props => (props.isWindowActive ? 1 : 0.7)};
  z-index: ${props => (props.isWindowActive ? 2 : 1)};
  cursor: ${props => (props.isWindowActive ? 'default' : 'pointer')};
  max-height: ${props => (props.isMinimized ? '35px' : '100vh')};
  transition: opacity 0.2s,
    max-height ${props => (props.isMinimized ? '0.3s' : '1s')};
  transform: translate(50px, 50px);
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
  isWindowActive,
  active,
  confirmRemovingList
}) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: 'This is my first todo item',
      date: 'Today, 20:31',
      isDone: false
    },
    {
      id: 2,
      content: 'And this is my second todo item, hooks are great!',
      date: 'Today, 20:34',
      isDone: true
    }
  ]);

  const [minimized, setMinimized] = useState(false);
  const [menuToggled, setMenuToggled] = useState(false);

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
  };

  const handleChangeItemState = index => {
    const newTodos = [...todos];

    newTodos[index].isDone = !newTodos[index].isDone;

    setTodos(newTodos);
  };

  const handleRemoveItem = index => {
    const newTodos = [...todos];

    newTodos.splice(index, 1);

    setTodos(newTodos);
  };

  const handleChangeViewState = () => {
    if (menuToggled) setMenuToggled(!menuToggled);

    setMinimized(!minimized);
  };

  const handleToggleMenu = () => {
    if (minimized) setMinimized(!minimized);

    setMenuToggled(!menuToggled);
  };

  return (
    <StyledWrapper
      ref={windowRef}
      onMouseDown={active}
      isWindowActive={isWindowActive}
      isMinimized={minimized}
    >
      <WindowHeader
        windowRef={windowRef}
        changeViewState={handleChangeViewState}
        isMinimized={minimized}
        toggleMenu={handleToggleMenu}
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
              index={index}
              changeItemState={handleChangeItemState}
              removeItem={handleRemoveItem}
            />
          ))
        ) : (
          <StyledParagraph>Plan sth crazy!</StyledParagraph>
        )}
      </StyledItems>
      <AddTodoForm addItem={handleAddTodoItem} />
    </StyledWrapper>
  );
};

export default TodoList;
