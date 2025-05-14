import styled from 'styled-components';

// Correctly formatted styled component
const StyledButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? '#0474c6' : '#6c757d'};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
  }

  /* Properly escaped font property */
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
`;
export default StyledButton  ;