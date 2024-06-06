import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConFirmDelete = styled.div`
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

export default function DeleteBooking({
  booking,
  onCloseModal,
  onConfirm,
  disable,
  navigate,
}) {
  const { id } = booking;
  return (
    <StyledConFirmDelete>
      <Heading as="h2">Delete Booking {id}</Heading>
      <p>
        Are you sure you want to delete this cabin {id} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button $variations="secondary" onClick={() => onCloseModal()}>
          Cancel
        </Button>
        <Button $variations="danger" onClick={onConfirm} disabled={disable}>
          Delete
        </Button>
      </div>
    </StyledConFirmDelete>
  );
}
