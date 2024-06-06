import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateuser from "./useUpdateUser";

export default function PasswordUpdate() {
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { isPending, updateUser } = useUpdateuser();
  const { errors } = formState;

  const handleOnSubmitEvent = ({ password }) => {
    updateUser({ password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(handleOnSubmitEvent)}>
      <FormRow label={"New password"} error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Repeat new password"} error={errors?.repeat?.message}>
        <Input
          type="password"
          id="repeat"
          disabled={isPending}
          {...register("repeat", {
            required: "this field is required",
            validate: (value) =>
              getValues().password === value || "Password is mismatch",
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variations="secondary" type="reset">
          Cancel
        </Button>
        <Button>Update Password</Button>
      </FormRow>
    </Form>
  );
}
