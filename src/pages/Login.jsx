import styled from "styled-components";
import InputContainer from "../ui/InputContainer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useSignIn } from "../features/users/useSignIn";
import { useForm } from "react-hook-form";
import { useUsersProvider } from "../features/users/UsersProvider";
import { useCurrentSession } from "../features/users/useCurrentSession";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background-color: var(--gray-50);

  & > * {
    width: 35%;
  }

  & h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem 3rem;
  gap: 1.5rem;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
`;

const ErrorMessage = styled.p`
  color: var(--red-600);
  background-color: var(--red-100);
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 8px;
`;

function Login() {
  const { user } = useUsersProvider();
  const { isFetchingSession, signIn: getSession } = useCurrentSession();
  const { isSigningIn, signIn, signInError } = useSignIn();
  const { register, handleSubmit } = useForm();

  useEffect(
    function () {
      if (!user) getSession();
    },
    [getSession, user]
  );

  function onSubmit(data) {
    signIn(data);
  }

  if (isFetchingSession) return <Spinner />;

  if (!user && !isFetchingSession)
    return (
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Laboratory Monitoring System</h1>
        <Container>
          <InputContainer>
            <label>Email</label>
            <Input
              type="text"
              placeholder="johndoe@email.com"
              {...register("email", { required: true })}
            />
          </InputContainer>
          <InputContainer>
            <label>Password</label>
            <Input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </InputContainer>
          {signInError && <ErrorMessage>{signInError?.message}</ErrorMessage>}
          <Button disabled={isSigningIn}>Sign in</Button>
        </Container>
      </StyledForm>
    );
}

export default Login;
