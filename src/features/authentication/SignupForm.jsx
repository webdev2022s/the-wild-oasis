import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

export default function SignupForm() {
  const { isPending, signup } = useSignup();
  const { handleSubmit, register, formState, reset, getValues } = useForm();

  const { errors } = formState;

  const handleSignUpEvent = (data) => {
    console.log(data);
    signup({ ...data }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(handleSignUpEvent)}>
      <FormRow label={"Full name:"} error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Email address:"} error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Password(min of 8 characters):"}
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password need a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Repeat Password:"} error={errors?.repeat?.message}>
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
        <Button disabled={isPending} $variations="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Sign-Up</Button>
      </FormRow>
    </Form>
  );
}
