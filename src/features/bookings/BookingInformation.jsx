import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";

import Row from "../../ui/Row";
import BookingData from "./BookingData";
import useBookingDetails from "./useBookingDetails";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import Button from "../../ui/Button";
import { ButtonGroup } from "../../ui/ButtonGroup";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../checkin/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import ModalCompound from "../../ui/ModalCompound";
import DeleteBooking from "../../ui/DeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;
export default function BookingInformation() {
  const useBack = useMoveBack();

  const navigate = useNavigate();

  const { isLoading, bookingDetailsById = {} } = useBookingDetails();
  const { isCheckOut, updateBookingCheckOut } = useCheckOut();
  const { isDeleting, deletingBooking } = useDeleteBooking();

  const { status, id: bookingId } = bookingDetailsById;

  if (isLoading) return <Spinner />;
  if (!bookingId) return <p>No Data Booking is Selected</p>;

  const statusColor = {
    unconfirmed: "blue",
    "check-in": "green",
    "check-out": "silver",
  };
  return (
    <>
      <Row type={"horizontal"}>
        <HeadingGroup>
          <Heading as={"h1"}>Booking # {bookingId}</Heading>
          <Tag type={statusColor[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={useBack}>&larr; Back</ButtonText>
      </Row>

      <BookingData booking={bookingDetailsById} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-In {status}
          </Button>
        )}

        {status === "check-in" && (
          <Button
            onClick={() => updateBookingCheckOut(bookingDetailsById)}
            disabled={isCheckOut}
          >
            Check-Out Booking {`${bookingId}`}
          </Button>
        )}
        <ModalCompound>
          <ModalCompound.Open opens={"delete-booking"}>
            <Button $variations="danger">Delete Booking</Button>
          </ModalCompound.Open>

          <ModalCompound.WindowModal name="delete-booking">
            <DeleteBooking
              booking={bookingDetailsById}
              disable={isDeleting}
              onConfirm={() =>
                deletingBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              navigate={navigate}
            />
          </ModalCompound.WindowModal>
        </ModalCompound>

        <Button $variations="secondary" onClick={useBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
