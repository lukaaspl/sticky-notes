import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import TodoList from './containers/TodoList';
import AddListForm from './containers/AddListForm';
import Prompt from './components/Prompt';
import WelcomeScreen from './components/WelcomeScreen';
import Footer from './components/Footer';

import backgroundAnimation from './helpers/backgroundAnimation';
import randomPlaceholder from './helpers/randomPlaceholder';
import randomActionMessage from './helpers/randomActionMessage';
import storage from './helpers/storage';

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
  const [todoLists, setTodoLists] = useState(
    storage.getLists() ? storage.getLists() : []
  );
  const [prompt, setPrompt] = useState(false);
  const [listToRemove, setListToRemove] = useState(null);
  const welcomeScreen = storage.getWelcomeScreen() ? true : false;

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

    storage.saveLists(newTodoLists);
    storage.removeItemsInstance(listToRemove.id);
    storage.removeListPositionInstance(listToRemove.id);
    storage.removeListViewStateInstance(listToRemove.id);
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
    const actionMessage = randomActionMessage(todoLists);

    const newTodoLists = [
      ...todoLists,
      { id, name, color, placeholder, actionMessage, isActive: false }
    ];

    setTodoLists(newTodoLists);
    storage.saveLists(newTodoLists);
  };

  const todoListsCollection = todoLists.map(todoList => (
    <TodoList
      key={todoList.id}
      id={todoList.id}
      name={todoList.name}
      color={todoList.color}
      placeholder={todoList.placeholder}
      actionMessage={todoList.actionMessage}
      isWindowActive={todoList.isActive}
      active={handleSetWindowActive.bind(this, todoList.id)}
      confirmRemovingList={handleConfirmRemovingList}
    />
  ));

  return (
    <>
      <GlobalStyle />
      <WelcomeScreen active={welcomeScreen} />
      <Prompt
        isVisible={prompt}
        listToRemove={listToRemove}
        removePrompt={handleRemovePrompt}
        removeList={handleRemoveList}
      />
      {todoLists.length > 0 && todoListsCollection}
      <AddListForm addList={handleAddList} isAnyList={todoLists.length > 0} />
      <Footer />
    </>
  );
};

export default App;
