import styled from "styled-components";

const ButtonText = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-500);
  font-weight: 500;
  text-align: center;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;

export default ButtonText;
