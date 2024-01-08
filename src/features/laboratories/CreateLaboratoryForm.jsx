import styled from "styled-components";
import { useForm } from "react-hook-form";

import InputContainer from "../../ui/InputContainer";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import { useCreateLaboratory } from "./useCreateLaboratory";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & > button {
    flex-grow: 1;
    align-self: flex-end;
  }
`;

const InputBox = styled(InputContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  & > input,
  & > select,
  & > textarea {
    max-width: 70%;
    min-width: 70%;
  }
`;

function CreateLaboratoryForm({ onCloseModal }) {
  const { isCreating, create } = useCreateLaboratory();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    create(
      { ...data },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <>
      {isCreating && <Spinner />}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <span>Name</span>
          <Input
            type="text"
            placeholder="Laboratory name"
            {...register("laboratoryName", { required: true })}
          />
        </InputBox>
        <InputBox>
          <span>Number of Computers</span>
          <Input
            type="number"
            placeholder="Total computers"
            {...register("totalComputers", { required: true })}
          />
        </InputBox>
        <InputBox>
          <span>Status</span>
          <Select {...register("laboratoryStatus", { required: true })}>
            <option value="" hidden>
              Select from option
            </option>
            <option value="open">Open</option>
            <option value="close">Close</option>
          </Select>
        </InputBox>
        <InputBox>
          <span>Description</span>
          <TextArea {...register("laboratoryDescription")} />
        </InputBox>
        <Button>Submit</Button>
      </StyledForm>
    </>
  );
}

export default CreateLaboratoryForm;
