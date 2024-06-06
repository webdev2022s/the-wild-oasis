import Filter from "../../ui/Filter.";
import SortBy from "../../ui/SortBy";
import TableOperationsFilter from "../../ui/TableOperation";

export default function BookingTableFilterOperation() {
  return (
    <TableOperationsFilter>
      <Filter
        urlParamName={"status"}
        options={[
          { value: "all", label: "all" },
          { value: "unconfirmed", label: "unconfirmed" },
          { value: "check-in", label: "check-in" },
          { value: "check-out", label: "check-out" },
        ]}
      />

      <SortBy
        urlParamName="sort"
        options={[
          {
            value: "startDate-desc",
            label: "Sort by date (recent-booking)",
          },
          {
            value: "startDate-asc",
            label: "Sort by date (ealier-booking)",
          },
          {
            value: "totalPrice-desc",
            label: "Sort by amount ⬆",
          },
          {
            value: "totalPrice-asc",
            label: "Sort by amount ⬇",
          },
        ]}
      />
    </TableOperationsFilter>
  );
}
