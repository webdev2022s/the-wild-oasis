import styled from "styled-components";

const StyledCheckBox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 0.2rem;
    transform-origin: 0;
    accent-color: var(--color-green-700);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-green-700);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
  }
`;

export default function CheckBox({
  children,
  id,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <StyledCheckBox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </StyledCheckBox>
  );
}
