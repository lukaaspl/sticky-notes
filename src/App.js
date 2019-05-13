import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoList from './containers/TodoList';

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
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <TodoList name="Primary todo list" />
    </>
  );
};

export default App;
