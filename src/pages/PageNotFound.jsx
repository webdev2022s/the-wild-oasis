import { useMoveBack } from "../hooks/useMoveBack";

import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StylePageNotFound = styled.main`
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
  border-radius: var(--border-raduis-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  return (
    <StylePageNotFound>
      <Box>
        <Heading as="h1">Error 404: Page not found</Heading>
        <Button $variations="secondary" onClick={useMoveBack()}>
          &larr; Go back
        </Button>
      </Box>
    </StylePageNotFound>
  );
}

export default PageNotFound;
