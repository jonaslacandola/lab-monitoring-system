import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import InputContainer from "../../ui/InputContainer";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

import { useStudentById } from "../students/useStudentById";
import { useCreateAttendance } from "../attendances/useCreateAttendance";
import { useLaboratories } from "../laboratories/useLaboratories";
import { useAvailableComputers } from "../computers/useAvailableComputers";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateComputer } from "../computers/useUpdateComputer";
import toast from "react-hot-toast";
import { format } from "date-fns";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35vw;
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

function CreateAttendanceForm({ onCloseModal }) {
  const [filteredComputers, setFilteredComputers] = useState([]);
  const {
    student,
    isLoading,
    error: errorStudent,
    getStudent,
  } = useStudentById();
  const { computers, isLoadingComputers } = useAvailableComputers();
  const { isCreating, createAttendance } = useCreateAttendance();
  const { laboratories, isLoadingLaboratories } = useLaboratories();
  const { isUpdatingStatus, updateStatus } = useUpdateComputer();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const queryClient = useQueryClient();
  const dateAndTime = new Date();
  const timeIn = `${dateAndTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateAndTime.getMinutes().toString().padStart(2, "0")}`;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      laboratoryId: "",
      computerId: "",
      timeIn,
    },
  });

  const submitNotAllowed =
    Boolean(errorStudent) || isCreating || isLoading || isUpdatingStatus;

  function handleCancel(e) {
    e.preventDefault();
    onCloseModal();
  }

  async function handleFetchStudentById(e) {
    await getStudent(e.target.value);
  }

  function handleFilterComputerByLabId(e) {
    setFilteredComputers(
      computers.filter(
        (computer) => computer.location === Number(e.target.value)
      )
    );
  }

  function checkAvailableComputers() {
    if (filteredComputers.length) return;
    toast.error("Sorry, there are no available computer.");
  }

  function onSubmit(data) {
    createAttendance(
      {
        ...data,
        computerId: data.computerId ? data.computerId : null,
        timeOut: data.timeOut ? data.timeOut : null,
        createdAt: currentDate,
      },
      {
        onSuccess: () => {
          const { computerId } = data;

          if (computerId) {
            updateStatus({
              computerId,
              status: "unavailable",
            });
          }

          queryClient.invalidateQueries({
            queryKey: ["currentAttendances"],
          });

          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label>Student ID</label>
        <Input
          type={"text"}
          placeholder={"1234-5678"}
          {...register("studentId", { required: true })}
          onBlur={handleFetchStudentById}
          disabled={isLoading}
        />
      </InputContainer>

      <InputContainer>
        <label>Name</label>
        <Input
          type={"text"}
          placeholder={"John Doe"}
          defaultValue={student?.studentName}
          disabled
        />
      </InputContainer>

      <InputContainer>
        <label>Year & Section</label>
        <Input
          type={"text"}
          placeholder={"BSIT 1B"}
          defaultValue={student?.yearAndSection}
          disabled
        />
      </InputContainer>

      <InputContainer>
        <label>Laboratory</label>
        <Select
          {...register("laboratoryId", { required: true })}
          onChange={handleFilterComputerByLabId}
          disabled={isLoadingLaboratories}
        >
          <option value="" hidden>
            Select location from option
          </option>
          {laboratories &&
            laboratories?.map((laboratory) => (
              <option
                key={laboratory.laboratoryId}
                value={laboratory.laboratoryId}
              >
                {laboratory.laboratoryName}
              </option>
            ))}
        </Select>
      </InputContainer>

      <InputContainer>
        <label>Computer</label>
        <Select
          {...register("computerId", {
            required: Boolean(filteredComputers.length),
          })}
          onClick={checkAvailableComputers}
          disabled={isLoadingComputers}
        >
          <option value="" hidden>
            Select computer from option
          </option>
          {computers &&
            filteredComputers.map((computer) => (
              <option key={computer.computerId} value={computer.computerId}>
                {computer.computer}
              </option>
            ))}
        </Select>
      </InputContainer>

      <InputContainer>
        <label>Time in</label>
        <Input
          type={"time"}
          {...register("timeIn", { required: true })}
          disabled
        />
      </InputContainer>

      <InputContainer>
        <label>Time out</label>
        <Input type={"time"} {...register("timeOut")} />
      </InputContainer>

      <ButtonsContainer>
        <Cancel onClick={handleCancel}>Cancel</Cancel>
        <Button disabled={submitNotAllowed}>Submit</Button>
      </ButtonsContainer>
    </StyledForm>
  );
}

export default CreateAttendanceForm;
