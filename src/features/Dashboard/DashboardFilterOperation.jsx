import Filter from "../../ui/Filter.";
import TableOperationsFilter from "../../ui/TableOperation";

export default function DashboardFilterOperation() {
  return (
    <TableOperationsFilter>
      <Filter
        urlParamName={"last"}
        options={[
          { value: "7", label: "last 7 days" },
          { value: "30", label: "last 30 days" },
          { value: "90", label: "last 90 days" },
        ]}
      />
    </TableOperationsFilter>
  );
}
