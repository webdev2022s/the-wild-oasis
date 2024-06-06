import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabin from "../features/cabins/AddCabin";
import AddCabinCompound from "../features/cabins/AddCabinCompound";
import CabinTableFilterOperation from "../features/cabins/CabinTableFilterOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <CabinTableFilterOperation />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />

        <AddCabinCompound />
      </Row>
    </>
  );
}

export default Cabins;
