import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useLogin from "./useLoging";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { handleSubmit, register, formState, reset } = useForm();

  const { errors } = formState;

  const { isPending, userLogin } = useLogin();

  const handleLoginEvent = (data) => {
    userLogin(
      { ...data },
      {
        onError: () => reset(),
      }
    );
  };
  return (
    <Form onSubmit={handleSubmit(handleLoginEvent)}>
      <FormRow
        label={"Email Address"}
        layout="landscape"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
          defaultValue={"sample@test.com"}
          autoComplete="username"
          disabled={isPending}
          {...register("email", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow
        label="Password"
        layout="landscape"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          defaultValue={"12345678"}
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow layout="landscape">
        <Button $sizes="medium" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRow>
      <FormRow>
        <NavLink to={"/reset"}>Forgot your Password?</NavLink>
      </FormRow>
    </Form>
  );
}
