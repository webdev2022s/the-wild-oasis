import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookingData from "../bookings/BookingData";
import { ButtonGroup } from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import useBookingDetails from "../bookings/useBookingDetails";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import CheckBox from "../../ui/CheckBox";
import { formatCurrency } from "../../utils/helper";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckIn";
import useGetSettings from "../settings/useGetSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default function CheckInDetails() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hadBreakfasts, setHadBreakfasts] = useState(false);
  const { updateBooking, isChecking } = useCheckin();
  const useBack = useMoveBack();

  const { isLoading, bookingDetailsById = {} } = useBookingDetails();
  const { settings = {}, isLoading: isSettings } = useGetSettings();

  const { breakfastPrice } = settings;

  const {
    id: bookingId,
    totalPrice,
    hasBreakfast,
    numGuests,
    numNights,
    status,
    guests: { fullName: guestName } = {},
  } = bookingDetailsById;

  const additionalBreakFast = numGuests * numNights * breakfastPrice;

  useEffect(() => {
    setIsConfirmed(bookingDetailsById?.isPaid ?? false);
  }, [bookingDetailsById]);

  function handeCheckIn() {
    if (!isConfirmed) return;

    if (hadBreakfasts) {
      updateBooking({
        bookingDetailsById,
        updateBreakfastPrice: {
          hasBreakfast: true,
          extraPrice: additionalBreakFast,
          totalPrice: additionalBreakFast + totalPrice,
        },
      });
    } else {
      updateBooking({ bookingDetailsById, updateBreakfastPrice: {} });
    }
  }

  if (isLoading || isSettings) return <Spinner />;

  return (
    <>
      <Row type={"horizontal"}>
        <Heading as={"h1"}>Check in booking # {bookingId}</Heading>
        <ButtonText onClick={useBack}>&larr; Back</ButtonText>
      </Row>

      <BookingData booking={bookingDetailsById} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            id="breakfast"
            checked={hadBreakfasts}
            onChange={() => {
              setHadBreakfasts((data) => !data);
              setIsConfirmed(false);
            }}
          >
            Want to add Breakfast for {formatCurrency(additionalBreakFast)}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          id="check"
          checked={isConfirmed}
          onChange={() => setIsConfirmed((data) => !data)}
          disabled={isConfirmed || isChecking}
        >
          I Confirm that {guestName} has paid the total amount of{" "}
          {hadBreakfasts
            ? `${formatCurrency(
                totalPrice + additionalBreakFast
              )} = ${formatCurrency(totalPrice)} + ${formatCurrency(
                additionalBreakFast
              )}`
            : formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => handeCheckIn()}
            disabled={!isConfirmed || isChecking}
          >{`Check in Booking #${bookingId}`}</Button>
        )}

        <Button $variations="secondary" onClick={useBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
