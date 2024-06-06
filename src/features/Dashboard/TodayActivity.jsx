import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayList from "./TodayList";

const StyledTodayActivity = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.4rem;

  grid-column: 1/3;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StyledUl = styled.ul`
  overflow-x: hidden;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 5rem;
`;

export default function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  return (
    <StyledTodayActivity>
      <Row>
        <Heading as="h2">Today's Activity</Heading>
      </Row>

      {!isLoading ? (
        activities?.length ? (
          <StyledUl>
            {activities.map((data) => (
              <TodayList data={data} key={data.id} />
            ))}
          </StyledUl>
        ) : (
          <NoActivity>No Activity Today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledTodayActivity>
  );
}
