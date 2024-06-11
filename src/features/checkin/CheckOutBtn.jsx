import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

export default function CheckOutBtn({ data }) {
  const { isCheckOut, updateBookingCheckOut } = useCheckOut();

  return (
    <Button
      $sizes="small"
      disabled={isCheckOut}
      onClick={() => updateBookingCheckOut(data)}
    >
      Check-Out
    </Button>
  );
}
