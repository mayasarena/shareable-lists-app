import styled from 'styled-components';

export const ColorButton = styled.button`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    border: 1px solid grey;
  }
`;

export const ColorButtonSelected = styled.button`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid grey;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    border: 1px solid grey;
  }
`;