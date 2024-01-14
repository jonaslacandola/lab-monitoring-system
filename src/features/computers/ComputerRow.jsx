import styled, { css } from "styled-components";
import { HiOutlineEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";

import PopOver from "../../ui/PopOver";
import Button from "../../ui/Button";
import MiniSpinner from "../../ui/MiniSpinner";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import { useDeleteComputerById } from "./useDeleteComputerById";
import { useSearchParams } from "react-router-dom";

const Status = styled.span`
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 13px;

  ${(props) =>
    props.status === "available" &&
    css`
      color: var(--lime-500);
      background-color: var(--lime-100);
      width: 27%;
    `}

  ${(props) =>
    props.status === "unavailable" &&
    css`
      color: var(--red-600);
      background-color: var(--red-100);
      width: 33%;
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
    deleteComputer({ computerId, laboratories });
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
          <Status status={computerStatus}>{computerStatus}</Status>
          <span>
            {computerDamage ? <i>{computerDamage}</i> : <i>&mdash;</i>}
          </span>

          <PopOver.Container>
            <PopOver.Toggle Id={computerId}>
              <Button type="icon">
                <HiOutlineEllipsisVertical />
              </Button>
            </PopOver.Toggle>

            <PopOver.Window Id={computerId}>
              <Modal.Open window={"computers"}>
                <PopOver.PopButton onEvent={handleUpdateQuery}>
                  <HiPencil />
                  <span>Update</span>
                </PopOver.PopButton>
              </Modal.Open>
              <PopOver.PopButton onEvent={handleDeleteComputer}>
                <HiTrash />
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
