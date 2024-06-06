import DashboardFilterOperation from "../features/Dashboard/DashboardFilterOperation";
import DashboardLayout from "../features/Dashboard/DashboardLayout";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilterOperation />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
