import Filter from "../../ui/Filter.";
import TableOperationsFilter from "../../ui/TableOperation";
import SortBy from "../../ui/SortBy";

export default function CabinTableFilterOperation() {
  return (
    <TableOperationsFilter>
      <Filter
        urlParamName="discount"
        options={[
          { value: "all", label: "all" },
          { value: "with-discount", label: "with-discount" },
          { value: "no-discount", label: "no-discount" },
        ]}
      />

      <SortBy
        urlParamName="sort"
        options={[
          {
            value: "name-asc",
            label: "Sort By Name A-Z",
          },
          {
            value: "name-dec",
            label: "Sort By Name Z-A",
          },
          {
            value: "regularPrice-asc",
            label: "Sort By Price ⬇",
          },
          {
            value: "regularPrice-dec",
            label: "Sort By Price ⬆",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort By max capacity/guest ⬇",
          },
          {
            value: "maxCapacity-dec",
            label: "Sort By max capacity/guest ⬆",
          },
        ]}
      />
    </TableOperationsFilter>
  );
}
