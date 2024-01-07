import styled from "styled-components";
import InputContainer from "../../ui/InputContainer";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreateComputer } from "./useCreateComputer";
import { useLaboratories } from "../laboratories/useLaboratories";
import { useSearchParams } from "react-router-dom";
import { useUpdateSpecificComputer } from "./useUpdateSpecificComputer";
import Spinner from "../../ui/Spinner";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & > button {
    flex-grow: 1;
    align-self: flex-end;
  }
`;

const Cancel = styled(Button)`
  background-color: var(--slate-100);
  color: var(--slate-800);
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;

  & > * {
    max-width: 18%;
    flex-grow: 1;
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

function CreateComputerForm({ onCloseModal }) {
  const { isCreating, create } = useCreateComputer();
  const { laboratories, isLoadingLaboratories } = useLaboratories();
  const { isUpdating, update } = useUpdateSpecificComputer();
  const [searchParams, setSearchParams] = useSearchParams();
  const [computerId, computerName, location, status, damage] =
    searchParams.getAll("computer");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      computer: computerName ? computerName : "",
      location: location ? location : "",
      computerStatus: status ? status : "available",
      computerDamage: damage ? damage : "",
    },
  });

  function handleCancel(e) {
    e.preventDefault();
    setSearchParams("");
    onCloseModal();
  }

  function onSubmit(data) {
    if (computerId) {
      update(
        {
          ...data,
          computerId,
          computerStatus: data.computerDamage
            ? "unavailable"
            : data.computerStatus,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      create(
        { ...data },
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
      {isCreating || (isUpdating && <Spinner />)}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <label>Computer</label>
          <Input
            type="text"
            placeholder="001"
            {...register("computer", { required: true })}
          />
        </InputBox>
        <InputBox>
          <label>Location</label>
          <Select
            {...register("location", { required: true })}
            disabled={isLoadingLaboratories}
          >
            <option value="" hidden>
              Select location from option
            </option>
            {laboratories?.map((laboratory) => (
              <option
                key={laboratory.laboratoryId}
                value={laboratory.laboratoryId}
              >
                {laboratory.laboratoryName}
              </option>
            ))}
          </Select>
        </InputBox>
        <InputBox>
          <label>Status</label>
          <Select {...register("computerStatus")} disabled={!status}>
            <option value="" hidden>
              Select location from option
            </option>
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
          </Select>
        </InputBox>
        <InputBox>
          <label>Damage</label>
          <TextArea {...register("computerDamage")}></TextArea>
        </InputBox>
        <ButtonsContainer>
          <Cancel onClick={handleCancel}>Cancel</Cancel>
          <Button disabled={isCreating || isUpdating}>Save</Button>
        </ButtonsContainer>
      </StyledForm>
    </>
  );
}

export default CreateComputerForm;
