import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";
import CheckOutBtn from "../checkin/CheckOutBtn";

const StyledLi = styled.li`
  display: grid;

  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1rem;

  align-items: center;

  font-size: 1.2rem;
  padding: 0.8rem 0;

  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-size: 1.2rem;
`;

const Nights = styled.div`
  font-size: 1.2rem;
`;

export default function TodayList({ data }) {
  const { status, guests, id, numNights } = data;
  return (
    <StyledLi>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {status === "check-in" && <Tag type="red">Departing</Tag>}

      {<Flag src={guests.countryFlag} alt={`image-${guests.countryFlag}`} />}
      <Guest>{guests.fullName}</Guest>
      <Nights>{numNights} Nights</Nights>
      {status === "unconfirmed" && (
        <Button $sizes="small" as={Link} to={`/checkin/${id}`}>
          Check-in
        </Button>
      )}
      {status === "check-in" && <CheckOutBtn id={id}>Check-out</CheckOutBtn>}
    </StyledLi>
  );
}
