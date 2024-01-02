import styled from "styled-components";
import InputContainer from "../ui/InputContainer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useSignIn } from "../features/users/useSignIn";
import { useForm } from "react-hook-form";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 50%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 2rem 3rem;
  gap: 1.5rem;
  border: 1px solid var(--gray-100);
`;

const ErrorMessage = styled.p`
  color: var(--red-600);
  background-color: var(--red-100);
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 8px;
`;

function Login() {
  const { isSigningIn, signIn, signInError } = useSignIn();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    signIn(data);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
