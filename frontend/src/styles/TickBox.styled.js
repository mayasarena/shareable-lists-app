import styled from 'styled-components';

export const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: ${({ margin }) => margin};
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #eee;

  &:hover {
    border: 1px solid #54B58A;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  ${CheckboxContainer}:hover input ~ & {
    background-color: #fff;
  }

  ${CheckboxContainer} input:checked ~ & {
    background-color: #54B58A;
    border: 1px solid #54B58A;
    
  }

  ${CheckboxContainer} input:checked ~ &:after {
    display: block;
  }
`;