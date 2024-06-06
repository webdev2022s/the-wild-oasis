import BookingTable from "../features/bookings/BookingTable";
import BookingTableFilterOperation from "../features/bookings/BookingTableFilterOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Booking() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableFilterOperation />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Booking;
