import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import TodoList from './containers/TodoList';
import AddListForm from './containers/AddListForm';
import Prompt from './components/Prompt';
import backgroundAnimation from './helpers/backgroundAnimation';
import randomPlaceholder from './helpers/randomPlaceholder';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Poppins, sans-serif;
    background: #77A1D3; 
    background-image: -webkit-linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);
    background-image: linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);
    background-size: 120%;
    height: 100vh;
    overflow: hidden;
    animation: ${backgroundAnimation} 30s ease-in infinite;
  }
`;

const App = () => {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      name: 'Primary todo list',
      color: 'Lilac Purple',
      placeholder: 'take dog for a walk',
      isActive: true
    },
    {
      id: 2,
      name: 'Additional list',
      color: 'Sky Blue',
      placeholder: 'check browsers compatibility',
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

    const placeholder = randomPlaceholder(todoLists);

    const newTodoLists = [
      ...todoLists,
      { id, name, color, placeholder, isActive: false }
    ];

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
          color={todoList.color}
          placeholder={todoList.placeholder}
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
