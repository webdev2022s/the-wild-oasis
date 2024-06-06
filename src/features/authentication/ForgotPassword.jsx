import styled from "styled-components";
import useGetUser from "./useGetUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import Logo from "../../ui/Logo";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import useResetPassword from "./useResetPassword";
import { useForm } from "react-hook-form";

const StyledReset = styled.div`
  background-color: var(--color-grey-50);
  min-height: 100dvh;

  display: grid;
  grid-template-columns: 45rem;

  gap: 3.2rem;
  align-content: center;
  justify-content: center;
`;

const FullSpinner = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDivReset = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
`;

export default function ForgotPassword() {
  const { handleSubmit, register, formState, reset } = useForm();
  const { errors } = formState;

  const { isAuthenticated, isLoading } = useGetUser();
  const { isPending, resetPassword } = useResetPassword();

  const navigate = useNavigate();

  function handleResetEvet(data) {
    resetPassword(
      { ...data },
      {
        onError: () => reset(),
        onSuccess: () => reset(),
      }
    );
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  if (isLoading)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );

  return (
    <StyledReset>
      <Logo />
      <Heading as="h4">Reset Paswword</Heading>
      <Form onSubmit={handleSubmit(handleResetEvet)}>
        <FormRow
          label={"Email address"}
          layout={"landscape"}
          error={errors?.email?.message}
        >
          <Input
            type="email"
            id="email"
            disabled={isPending}
            {...register("email", { required: "this field is required" })}
          />
        </FormRow>
        <StyledDivReset>
          <Button
            $variations="secondary"
            onClick={() => navigate("/")}
            disabled={isPending}
          >
            &larr; Back
          </Button>
          <Button $variations="secondary" type="reset" disabled={isPending}>
            Cancel
          </Button>
          <Button disabled={isPending}>Reset password</Button>
        </StyledDivReset>
      </Form>
    </StyledReset>
  );
}
