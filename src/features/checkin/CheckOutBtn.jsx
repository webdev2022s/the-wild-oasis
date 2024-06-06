import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

export default function CheckOutBtn({ id }) {
  const { isCheckOut, updateBookingCheckOut } = useCheckOut();
  return (
    <Button
      $sizes="small"
      disabled={isCheckOut}
      onClick={() => updateBookingCheckOut(id)}
    >
      Check-Out
    </Button>
  );
}
