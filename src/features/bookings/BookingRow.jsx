import styled from "styled-components";
import Table from "../../ui/Table";
import { isToday } from "date-fns";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
} from "../../utils/helper";
import MenuCompound from "../../ui/MenuCompound";
import {
  HiEye,
  HiDocumentCheck,
  HiArrowUpOnSquareStack,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../checkin/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import ModalCompound from "../../ui/ModalCompound";
import DeleteBooking from "../../ui/DeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Tag = styled.div`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.$type}-700);
  background-color: var(--color-${(props) => props.$type}-100);
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function BookingRow({ booking }) {
  //destructed
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,

    totalPrice,
    status,
    cabins: { name: cabinName },
    guests: { fullName, email },
  } = booking;

  const { isCheckOut, updateBookingCheckOut } = useCheckOut();
  const { isDeleting, deletingBooking } = useDeleteBooking();

  const handleCheckOutEvent = (id) => {
    updateBookingCheckOut(id);
  };

  const handleDeleteEvent = (id) => deletingBooking(id);

  const statusColorCode = {
    unconfirmed: "blue",
    "check-in": "green",
    "check-out": "silver",
  };

  const navigate = useNavigate();
  return (
    <Table.TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          &rarr; {numNights} night stay
        </span>
        <span>
          {/* {format(new Date(startDate), "MMM dd yyyy")}&mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")} */}
          {formatDate(startDate)}&mdash; {formatDate(endDate)}
        </span>
      </Stacked>

      <Tag $type={statusColorCode[status]}>{status}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ModalCompound>
        <MenuCompound.Menu>
          <MenuCompound.Toggle id={bookingId} />
          <MenuCompound.List id={bookingId}>
            <MenuCompound.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
              color="yellow"
            >
              See Booking Details
            </MenuCompound.Button>

            {status === "unconfirmed" && (
              <MenuCompound.Button
                icon={<HiDocumentCheck />}
                color={"green"}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-In
              </MenuCompound.Button>
            )}

            {status === "check-in" && (
              <MenuCompound.Button
                color="red"
                icon={<HiArrowUpOnSquareStack />}
                onClick={() => handleCheckOutEvent()}
                disabled={isCheckOut}
              >
                Check-Out
              </MenuCompound.Button>
            )}

            <ModalCompound.Open opens="delete-booking">
              <MenuCompound.Button color="orange" icon={<HiTrash />}>
                Delete
              </MenuCompound.Button>
            </ModalCompound.Open>
          </MenuCompound.List>

          <ModalCompound.WindowModal name="delete-booking">
            <DeleteBooking
              booking={booking}
              onConfirm={() => handleDeleteEvent(bookingId)}
              disable={isDeleting}
            />
          </ModalCompound.WindowModal>
        </MenuCompound.Menu>
      </ModalCompound>
    </Table.TableRow>
  );
}
