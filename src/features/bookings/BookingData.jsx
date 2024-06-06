import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import {
  formatCurrency,
  formatDates,
  formatDistanceFromNow,
} from "../../utils/helper";
import { isToday } from "date-fns";
import DateItem from "../../ui/DateItem";
import styled from "styled-components";
import { Flag } from "../../ui/Flag";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  margin: 1rem 0;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 0.4rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};

  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  & svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

export default function BookingData({ booking }) {
  const {
    numNights,
    cabins: { name: cabinName },
    startDate,
    endDate,
    guests: {
      countryFlag,
      nationality: country,
      fullName: guestName,
      nationalID,
      email,
    },
    numGuests,
    observations,
    hasBreakfast,
    totalPrice,
    cabinPrice,
    extraPrice,
    isPaid,
    created_at,
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {formatDates(startDate)}{" "}
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &mdash; {formatDates(endDate)}
        </p>
      </Header>
      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>
        {observations && (
          <DateItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label={"Observations"}
          >
            {observations}
          </DateItem>
        )}

        <DateItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DateItem>

        <Price $isPaid={isPaid}>
          <DateItem icon={<HiOutlineCurrencyDollar />} label="Total Price">
            {formatCurrency(totalPrice)}{" "}
            {hasBreakfast &&
              `= ${formatCurrency(cabinPrice)} cabin +  ${formatCurrency(
                extraPrice
              )} breakfast`}
          </DateItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {formatDates(created_at)}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}
