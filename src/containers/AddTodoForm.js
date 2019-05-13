import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const StyledForm = styled.form`
  position: relative;
`;

const StyledInput = styled.input`
  width: 96%;
  display: block;
  margin: 6px auto;
  padding: 5px 30px 5px 7px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid ${props => (props.error ? '#D68FB2' : '#bbb')};
  color: #333;
  font-size: 14px;
  border-radius: 8px;
  outline: none;
  font-family: Poppins, sans-serif;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #444;
  cursor: pointer;
  padding: 10px;
  border: none;
  background: none;
  outline: none;
  transition: opacity 0.3s;

  ${props =>
    props.visible
      ? 'opacity: 1; pointer-events: all'
      : 'opacity: 0; pointer-events: none'};

  &:hover + input {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

class AddTodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false
    };
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  checkValue = e => {
    e.preventDefault();

    if (this.state.value.length > 1) {
      this.props.addItem(this.state.value);
      return this.setState({ value: '', error: false });
    }

    this.setState({ error: true });

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => this.setState({ error: false }), 1500);
  };

  render() {
    return (
      <StyledForm onSubmit={this.checkValue}>
        <StyledButton type="submit" visible={this.state.value.length > 1}>
          <FaPlus />
        </StyledButton>
        <StyledInput
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          error={this.state.error}
          type="text"
          placeholder="e.g. check browsers compatibility"
        />
      </StyledForm>
    );
  }
}

export default AddTodoForm;
