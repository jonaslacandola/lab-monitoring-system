import styled from "styled-components";
import { useForm } from "react-hook-form";

import InputContainer from "../../ui/InputContainer";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import { useCreateLaboratory } from "./useCreateLaboratory";
import FileInput from "../../ui/FileInput";
import { useSearchParams } from "react-router-dom";
import { useUpdateLaboratoryById } from "./useUpdateLaboratoryById";

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
  const { isUpdating, update } = useUpdateLaboratoryById();
  const [searchParams] = useSearchParams();
  const [
    laboratoryId,
    laboratoryName,
    laboratoryStatus,
    laboratoryDescription,
    imageURL,
  ] = searchParams.getAll("laboratory");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      laboratoryName,
      laboratoryStatus,
      laboratoryDescription: laboratoryDescription
        ? decodeURIComponent(laboratoryDescription)
        : "",
    },
  });
  const isLoading = isCreating || isUpdating;

  function onSubmit(data) {
    if (laboratoryId) {
      update(
        {
          ...data,
          prevImageURL: imageURL,
          imageURL: data.imageURL[0],
          laboratoryId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      create(
        { ...data, imageURL: data.imageURL[0] },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <span>Name</span>
          <Input
            type="text"
            placeholder="Laboratory name"
            {...register("laboratoryName", { required: true })}
          />
        </InputBox>
        {!laboratoryId && (
          <InputBox>
            <span>Number of Computers</span>
            <Input
              type="number"
              placeholder="Total computers"
              {...register("totalComputers", { required: true })}
            />
          </InputBox>
        )}
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
          <span>Image</span>
          <FileInput
            {...register("imageURL", {
              required: Boolean(!laboratoryId),
              validate: (file) => file && file[0]?.type.startsWith("image"),
            })}
          />
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
