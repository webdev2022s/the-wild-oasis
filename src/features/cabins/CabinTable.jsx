import useCabin from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import MenuCompound from "../../ui/MenuCompound";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabin();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1 filter
  const filterData = searchParams.get("discount") || "all";

  let filterDataValue;
  if (filterData === "all") filterDataValue = cabins;
  if (filterData === "with-discount")
    filterDataValue = cabins.filter((data) => data.discount > 0);
  if (filterData === "no-discount")
    filterDataValue = cabins.filter((data) => data.discount === 0);

  // 2 sort
  const sortBy = searchParams.get("sort") || "name-asc";
  const [field, directions] = sortBy.split("-");
  const modifier = directions === "asc" ? 1 : -1;
  const sortedCabin = filterDataValue.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <MenuCompound>
      {" "}
      <Table columns="0.6fr 1fr 1.8fr repeat(2, .7fr) .5fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.TableBody
          // data={filterDataValue}
          data={sortedCabin}
          render={(cabins) => <CabinRow cabins={cabins} key={cabins.id} />}
        />
      </Table>
    </MenuCompound>
  );
}
