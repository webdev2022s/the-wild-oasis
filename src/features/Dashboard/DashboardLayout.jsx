import styled from "styled-components";
import Statistic from "./Statistic";
import useRecentBooking from "./useRecentBooking";
import useRecentStay from "./useRecentStay";
import Spinner from "../../ui/Spinner";
import useCabin from "../cabins/useCabins";
import ChartSales from "./ChartSales";
import ChartPieDuration from "./ChartPieDuration";
import TodayActivity from "./TodayActivity";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;

  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, recentBookingByLastDate } = useRecentBooking();
  const { isLoading: loadedTwo, filteredStay, numStay } = useRecentStay();
  const { isLoading: isLoading3, cabins } = useCabin();

  if (loadedTwo || isLoading || isLoading3) return <Spinner />;

  return (
    <StyledDashboard>
      <Statistic
        booking={recentBookingByLastDate}
        filteredStay={filteredStay}
        numStay={numStay}
        cabins={cabins}
      />

      <TodayActivity />
      <ChartPieDuration confirmStay={filteredStay} />
      <ChartSales numStay={numStay} booking={recentBookingByLastDate} />
    </StyledDashboard>
  );
}
