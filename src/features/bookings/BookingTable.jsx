import MenuCompound from "../../ui/MenuCompound";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useBooking from "./useBooking";

export default function BookingTable() {
  const { data: bookings, isLoading, count } = useBooking();

  if (isLoading) return <Spinner />;
  return (
    <MenuCompound>
      <Table columns={"0.6fr 1.5fr 1.4fr repeat(2, .7fr) .5fr"}>
        <Table.Header>
          <div>cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.TableBody
          data={bookings}
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </MenuCompound>
  );
}
