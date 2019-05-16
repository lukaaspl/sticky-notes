import React, { Component } from 'react';
import styled from 'styled-components';
import PulseAnimation from '../helpers/PulseAnimation';
import ColorBox from '../components/ColorBox';
import { FaArrowRight } from 'react-icons/fa';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  left: 32px;
  display: flex;
`;

const AddListButton = styled.div`
  position: relative;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.isFormToggled ? '0.7' : '0.4')};
  border: 2px solid #6d2345;
  cursor: pointer;
  transition: opacity 0.2s, box-shadow 0.2s;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.3);

  :hover {
    opacity: ${props => (props.isFormToggled ? '0.7' : '0.6')};
    ${props => (props.isFormToggled ? 'animation: none' : PulseAnimation)};
  }

  ::before,
  ::after {
    content: '';
    position: absolute;
    height: 20px;
    width: 2px;
    left: 50%;
    top: 50%;
    background-color: #6d2345;
    transition: transform 0.4s;
  }

  ::before {
    transform: ${props =>
      props.isFormToggled
        ? 'translate(-50%, -50%) rotate(135deg)'
        : 'translate(-50%, -50%)'};
  }

  ::after {
    transform: ${props =>
      props.isFormToggled
        ? 'translate(-50%, -50%) rotate(225deg)'
        : 'translate(-50%, -50%) rotate(90deg)'};
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  margin-left: 13px;
  font-family: Poppins, sans-serif;
  font-size: 17px;
  padding: 0 20px;
  height: 55px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid;
  border-color: ${props => (props.error ? '#ce6d9d' : 'transparent')};
  border-radius: 20px;
  outline: none;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.3);
  color: #333;
  transition: border-color 0.5s, background-color 0.2s, transform 0.3s,
    opacity 0.3s;

  ${props =>
    props.isVisible
      ? 'transform: translateY(0); opacity: 1; pointer-events: all;'
      : 'transform: translateY(40px); opacity: 0; pointer-events: none'};

  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledColorsList = styled.div`
  margin-left: 13px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 0 20px;
  height: 58px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  transition: transform 0.3s, opacity 0.3s;

  ${props =>
    props.isVisible
      ? 'transform: translateY(0); opacity: 1; pointer-events: all;'
      : 'transform: translateY(40px); opacity: 0; pointer-events: none'};
`;

const StyledSubmitButton = styled.button`
  margin-left: 20px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  height: 58px;
  background-color: rgba(96, 201, 200, 0.7);
  padding: 0 20px;
  border: none;
  cursor: pointer;
  font-size: 25px;
  transform: scale(1);
  transition: transform 0.3s, background-color 0.3s, opacity 0.3s;
  outline: none;

  ${props =>
    props.isVisible
      ? 'transform: translateY(0); opacity: 1; pointer-events: all;'
      : 'transform: translateY(40px); opacity: 0; pointer-events: none'};

  :hover {
    transform: scale(1.15);
    background-color: rgba(96, 201, 200, 0.9);
  }

  svg {
    vertical-align: -3px;
  }
`;

class AddListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormToggled: false,
      listName: '',
      listNameError: false,
      colors: [
        { id: 1, name: 'Sky Blue', picked: false },
        { id: 2, name: 'Desert Hell', picked: false },
        { id: 3, name: 'Lilac Purple', picked: false }
      ],
      colorPicked: false,
      defaultColor: 'Sky Blue'
    };

    this.inputRef = React.createRef();
  }

  handleToggleForm = () => {
    const unpickedColors = [...this.state.colors].map(color => {
      if (color.picked) color.picked = false;

      return color;
    });

    if (!this.state.isFormToggled) this.inputRef.current.focus();

    this.setState({
      isFormToggled: !this.state.isFormToggled,
      listName: '',
      listNameError: false,
      colors: unpickedColors,
      colorPicked: false
    });
  };

  handlePickColor = (colorId, colorName) => {
    const newColors = [...this.state.colors];

    newColors.map(color => {
      if (color.id === colorId) color.picked = true;
      else color.picked = false;

      return color;
    });

    this.setState({ colors: newColors, colorPicked: colorName });
  };

  handleUpdate = e => {
    this.setState({ listName: e.target.value });
  };

  handleValidateForm = e => {
    e.preventDefault();

    const { colorPicked, defaultColor, listName } = this.state;

    if (listName.length <= 2) {
      this.setState({ listNameError: true });

      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(
        () => this.setState({ listNameError: false }),
        2000
      );

      return false;
    }

    const listColor = colorPicked ? colorPicked : defaultColor;

    this.handleToggleForm();
    this.props.addList(listName, listColor);
  };

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  render() {
    const {
      isFormToggled,
      listName,
      colors,
      listNameError,
      colorPicked
    } = this.state;

    return (
      <StyledWrapper>
        <AddListButton
          onClick={this.handleToggleForm}
          isFormToggled={isFormToggled}
        />
        <StyledForm onSubmit={this.handleValidateForm}>
          <StyledInput
            ref={this.inputRef}
            isVisible={isFormToggled}
            placeholder="enter your list name..."
            value={this.state.listName}
            onChange={this.handleUpdate}
            error={listNameError}
          />
          <StyledColorsList isVisible={listName.length > 2}>
            {colors.map(color => (
              <ColorBox
                key={color.id}
                id={color.id}
                name={color.name}
                picked={color.picked}
                pickColor={this.handlePickColor}
              />
            ))}
          </StyledColorsList>
          <StyledSubmitButton isVisible={colorPicked && listName.length > 2}>
            <FaArrowRight />
          </StyledSubmitButton>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

export default AddListForm;
