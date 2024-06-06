import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useGetSettings from "./useGetSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

export default function SettingForm() {
  const {
    isLoading,
    settings: {
      minBookingLenght,
      maxBookingLenght,
      maxGuestesPerBooking,
      breakfastPrice,
    } = {},
  } = useGetSettings();
  const { updateSetting, isPending } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner></Spinner>;
  return (
    <Form>
      <FormRow label={"Minimum Night/Booking "}>
        <Input
          disabled={isPending}
          type="number"
          id="minBookingLenght"
          defaultValue={minBookingLenght}
          onBlur={(e) => handleUpdate(e, "minBookingLenght")}
        />
      </FormRow>

      <FormRow label={"Maximum  Night/Booking"}>
        <Input
          disabled={isPending}
          type="number"
          id="maxBookingLenght"
          defaultValue={maxBookingLenght}
          onBlur={(e) => handleUpdate(e, "maxBookingLenght")}
        />
      </FormRow>

      <FormRow label={"Max Guest"}>
        <Input
          disabled={isPending}
          type="number"
          id="maxGuestesPerBooking"
          defaultValue={maxGuestesPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestesPerBooking")}
        />
      </FormRow>

      <FormRow label={"Breakfast Price"}>
        <Input
          disabled={isPending}
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}
