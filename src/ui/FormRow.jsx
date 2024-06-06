import styled, { css } from "styled-components";

const layout = {
  portrait: css`
    display: grid;
    align-items: center;

    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    }
  `,
  landscape: css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0;
  `,
};

const StyledFormRow = styled.div`
  ${(props) => layout[props.$layout]}
`;

const Label = styled.label`
  font-weight: 500;
  font-family: "sono";
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

StyledFormRow.defaultProps = {
  $layout: "portrait",
};

function FormRow({ children, label, error, layout }) {
  return (
    <StyledFormRow $layout={layout}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
