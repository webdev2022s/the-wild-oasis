import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stats from "./Stats";
import { formatCurrency } from "../../utils/helper";

export default function Statistic({ booking, filteredStay, numStay, cabins }) {
  const numBooking = booking.length;

  const sales = booking.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  const checkIn = filteredStay.length;

  const occupancy =
    filteredStay.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numStay * cabins.length);

  return (
    <>
      <Stats
        title={"Bookings"}
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBooking}
      />
      <Stats
        title={"Sales"}
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stats
        title={"Check-ins"}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIn}
      />
      <Stats
        title={"Occupancy Rates"}
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}
