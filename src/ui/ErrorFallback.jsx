import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import Heading from "./Heading";
import Button from "./Button";

const StyledError = styled.div`
  height: 100dvh;

  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h2 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

export default function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyle />
      <StyledError>
        <Box>
          <Heading as="h2">Something went wrong!</Heading>
          <p>{error.message}</p>
          <Button $sizes="large" onClick={() => resetErrorBoundary()}>
            Try Again!
          </Button>
        </Box>
      </StyledError>
      ;
    </>
  );
}
