import styled, { css } from "styled-components";
import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";

import PopOver from "../../ui/PopOver";
import Button from "../../ui/Button";
import MiniSpinner from "../../ui/MiniSpinner";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import { useDeleteComputerById } from "./useDeleteComputerById";
import { useSearchParams } from "react-router-dom";

const Status = styled.span`
  ${(props) =>
    props.status === "available" &&
    css`
      color: var(--lime-500);
    `}

  ${(props) =>
    props.status === "unavailable" &&
    css`
      color: var(--red-600);
    `}
`;

function ComputerRow({ computer }) {
  const { isDeletingComputer, deleteComputer } = useDeleteComputerById();
  const {
    computerId,
    computer: computerName,
    laboratories,
    computerStatus,
    computerDamage,
  } = computer;
  const { laboratoryName } = laboratories;
  const [, setSearchParams] = useSearchParams();

  function handleDeleteComputer() {
    deleteComputer(computerId);
  }

  function handleUpdateQuery() {
    setSearchParams({
      computer: [
        computerId,
        computerName,
        laboratories.laboratoryId,
        computerStatus,
        computerDamage,
      ],
    });
  }

  return (
    <>
      {isDeletingComputer && (
        <Table.Empty>
          <MiniSpinner />
        </Table.Empty>
      )}
      {!isDeletingComputer && (
        <Table.Row>
          <span>{computerName}</span>
          <span>{laboratoryName}</span>
          <Status status={computerStatus}>• {computerStatus}</Status>
          <span>{computerDamage ? computerDamage : "--"}</span>

          <PopOver.Container>
            <PopOver.Toggle Id={computerId}>
              <Button type="icon">
                <HiOutlineEllipsisVertical />
              </Button>
            </PopOver.Toggle>

            <PopOver.Window Id={computerId}>
              <Modal.Open>
                <PopOver.PopButton
                  color={"var(--blue-500)"}
                  onEvent={handleUpdateQuery}
                  window={"computers"}
                >
                  <HiOutlinePencil />
                  <span>Update</span>
                </PopOver.PopButton>
              </Modal.Open>
              <PopOver.PopButton
                onEvent={handleDeleteComputer}
                color={"var(--red-500)"}
              >
                <HiOutlineTrash />
                <span>Remove</span>
              </PopOver.PopButton>
            </PopOver.Window>
          </PopOver.Container>
        </Table.Row>
      )}
    </>
  );
}

export default ComputerRow;