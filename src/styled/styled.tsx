import styled from 'styled-components';

export const Select = styled.select`
  height: 40px;
  border: 1px solid gray;
  width: 100%;
  border-radius: 8px;
  color: black;
  padding: 0 8px;
`;
export const Button = styled.button`
  background-color: black;
  color: white;
  height: 40px;
  width: 160px;
  border-radius: 10px;
  &:disabled {
    background-color: #ccc;
    color: gray;
    cursor: not-allowed;
    border: 1px solid #ddd;
  }
`;
