import React, { useState } from 'react';
import styled from 'styled-components';
import AddTodoForm from '../containers/AddTodoForm';
import TodoItem from '../components/TodoItem';

const StyledWrapper = styled.div`
  width: 350px;
  min-height: 400px;
  margin: 20px;
  border-radius: 5px;
  background-color: #add8e6;
  box-shadow: 0 6px 7px -2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  height: 30px;
  border-radius: 5px 5px 0 0;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.6);

  h2 {
    color: #eee;
    text-align: center;
    font-size: 15px;
    line-height: 30px;
  }
`;

const StyledItems = styled.div`
  flex-grow: 1;
`;

const StyledParagraph = styled.p`
  margin: 40px 0;
  text-align: center;
  opacity: 0.1;
  font-size: 36px;
`;

const TodoList = ({ name }) => {
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

  return (
    <StyledWrapper>
      <StyledHeader>
        <h2>{name}</h2>
      </StyledHeader>
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
