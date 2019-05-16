import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import TodoList from './containers/TodoList';
import AddListForm from './containers/AddListForm';
import Prompt from './components/Prompt';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Poppins, sans-serif;
    background: #77A1D3; 
    background: -webkit-linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);
    background: linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);
    height: 100vh;
    overflow: hidden;
  }
`;

const App = () => {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      name: 'Primary todo list',
      color: 'Sky Blue',
      isActive: true
    },
    {
      id: 2,
      name: 'Additional list',
      color: 'Sky Blue',
      isActive: false
    }
  ]);

  const [prompt, setPrompt] = useState(false);
  const [listToRemove, setListToRemove] = useState(null);

  const handleSetWindowActive = id => {
    const newTodoLists = [...todoLists];

    newTodoLists.forEach(todoList => {
      if (todoList.id === id) todoList.isActive = true;
      else todoList.isActive = false;
    });

    setTodoLists(newTodoLists);
  };

  const handleConfirmRemovingList = (id, name) => {
    setListToRemove({ id, name });
    setPrompt(true);
  };

  const handleRemoveList = () => {
    const newTodoLists = [...todoLists].filter(
      todoList => todoList.id !== listToRemove.id
    );

    setTodoLists(newTodoLists);
    setPrompt(false);
    setListToRemove(null);
  };

  const handleRemovePrompt = e => {
    if (e.target.id !== 'overlay' && e.target.id !== 'rejectConfirmation')
      return false;

    setPrompt(false);
  };

  const handleAddList = (name, color) => {
    const id =
      todoLists.length > 0
        ? parseInt(todoLists[todoLists.length - 1].id + 1)
        : 1;

    const newTodoLists = [...todoLists, { id, name, color, isActive: false }];

    setTodoLists(newTodoLists);
  };

  return (
    <>
      <GlobalStyle />
      <Prompt
        isVisible={prompt}
        listToRemove={listToRemove}
        removePrompt={handleRemovePrompt}
        removeList={handleRemoveList}
      />
      {todoLists.map(todoList => (
        <TodoList
          key={todoList.id}
          id={todoList.id}
          name={todoList.name}
          isWindowActive={todoList.isActive}
          active={handleSetWindowActive.bind(this, todoList.id)}
          confirmRemovingList={handleConfirmRemovingList}
        />
      ))}
      <AddListForm addList={handleAddList} />
    </>
  );
};

export default App;
