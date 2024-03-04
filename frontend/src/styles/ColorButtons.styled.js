import styled from 'styled-components';

export const ColorButton = styled.button`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }
`;

export const ColorButtonSelected = styled.button`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }
`;

export const ColorOptionsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;