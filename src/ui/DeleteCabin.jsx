import styled from "styled-components";

import Heading from "../ui/Heading";
import Button from "./Button";
const StyledConfirmDelete = styled.div`
  width: 40rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default function DeleteCabin({ resourceName, onCloseModal, onConfirm }) {
  return (
    <StyledConfirmDelete>
      <Heading as={"h3"}>Delete Cabin {resourceName.name}</Heading>
      <p>
        Are you sure you want to delete this cabin {resourceName.name}{" "}
        permanently? This action cannot be undone.
      </p>

      <div>
        <Button $variations="secondary" onClick={() => onCloseModal()}>
          Cancel
        </Button>
        <Button $variations="danger" onClick={() => onConfirm(resourceName)}>
          Delete Cabin
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
