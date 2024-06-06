import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import useGetUser from "../features/authentication/useGetUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const StyledLogin = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 45rem;

  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const FullSpinner = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Login() {
  const { isAuthenticated, isLoading } = useGetUser();
  const navigate = useNavigate();

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
    <StyledLogin>
      <Logo />
      <Heading as="h4">Login Your Account</Heading>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
