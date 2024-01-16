import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

import InputContainer from "../../ui/InputContainer";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Select from "../../ui/Select";

import { useCreateAdmin } from "./useCreateAdmin";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
`;

const ErrorMessage = styled.p`
  color: var(--red-600);
  background-color: var(--red-100);
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 8px;
`;

function CreateAdminForm() {
  const { isCreating, create } = useCreateAdmin();
  const { handleSubmit, register, getValues } = useForm();
  const [error, setError] = useState("");

  function onSubmit(data) {
    create({ ...data, pfpURL: data.pfpURL[0] });
  }

  function validateEmail(email) {
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      return false;
    }

    return emailRegex.test(email);
  }

  function validatePassword(password) {
    setError("");
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Enter a valid password with a minimum of 8 characters, at least 1 digit, and an uppercase letter."
      );
      return false;
    }

    return passwordRegex.test(password);
  }

  function validateConfirmPassword(confirmPassword) {
    setError("");
    const { adminPassword } = getValues();

    if (adminPassword !== confirmPassword) {
      setError("Password did not match.");
      return false;
    }

    return adminPassword === confirmPassword;
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <span>First name</span>
        <Input
          type="text"
          placeholder="First name"
          {...register("firstName", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <span>Last name</span>
        <Input
          type="text"
          placeholder="Last name"
          {...register("lastName", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <span>Email</span>
        <Input
          type="email"
          placeholder="admin@email.com"
          {...register("adminEmail", {
            required: true,
            validate: validateEmail,
          })}
        />
      </InputContainer>
      <InputContainer>
        <span>Role</span>
        <Select {...register("role", { required: true })}>
          <option value="" hidden>
            Select from options
          </option>
          <option value="administrator">Administrator</option>
          <option value="instructor">Instructor</option>
        </Select>
      </InputContainer>
      <InputContainer>
        <span>Password</span>
        <Input
          type="password"
          placeholder="Password"
          {...register("adminPassword", {
            required: true,
            validate: validatePassword,
          })}
        />
      </InputContainer>
      <InputContainer>
        <span>Confirm password</span>
        <Input
          type="password"
          placeholder="Confirm password"
          {...register("adminConfirmPassword", {
            required: true,
            validate: validateConfirmPassword,
          })}
        />
      </InputContainer>
      <InputContainer>
        <span>Display picture</span>
        <FileInput {...register("pfpURL", { required: true })} />
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button disabled={isCreating}>
        {isCreating ? "Creating account" : "Create account"}
      </Button>
    </StyledForm>
  );
}

export default CreateAdminForm;
