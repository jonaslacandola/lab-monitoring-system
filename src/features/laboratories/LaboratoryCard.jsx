import styled, { css } from "styled-components";
import { HiOutlineEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";

import PopOver from "../../ui/PopOver";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

import Picture from "../../data/IMG_1052.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteLaboratory } from "./useDeleteLaboratory";
import Spinner from "../../ui/Spinner";

const LabCard = styled.div`
  background-color: white;

  border: 1px solid var(--gray-200);
  border-radius: 8px;

  width: 32%;

  & > img {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 8px 1rem 1.4rem;
`;

const Status = styled.span`
  font-size: 14px;
  border-radius: 50px;
  padding: 4px 8px;

  ${(props) =>
    props.type === "open" &&
    css`
      color: var(--lime-500);
      background-color: var(--lime-100);
    `}

  ${(props) =>
    props.type === "close" &&
    css`
      color: var(--gray-500);
      background-color: var(--gray-100);
    `}
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
`;

const SubText = styled.p`
  color: var(--gray-500);
  font-size: 14px;
  text-transform: capitalize;
`;

const Description = styled.span`
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Warning = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--yellow-400);
  margin-bottom: 1rem;

  & svg {
    font-size: 2rem;
  }
`;

function LaboratoryCard({ laboratory }) {
  const {
    laboratoryId,
    laboratoryName,
    laboratoryStatus,
    totalComputers,
    laboratoryDescription,
  } = laboratory;
  const { deleteLaboratory, isDeleting } = useDeleteLaboratory();

  function handleDelete() {
    deleteLaboratory(laboratoryId);
  }

  return (
    <>
      {isDeleting && <Spinner />}
      <LabCard>
        <img src={Picture} />
        <Body>
          <Container>
            <Title>{laboratoryName}</Title>
            <Container>
              <Status type={laboratoryStatus}>{laboratoryStatus}</Status>
              <PopOver.Container>
                <PopOver.Toggle Id={laboratoryId}>
                  <Button type="icon">
                    <HiOutlineEllipsisVertical />
                  </Button>
                </PopOver.Toggle>
                <PopOver.Window Id={laboratoryId}>
                  <Modal.Open window={"addLabForm"}>
                    <PopOver.PopButton>
                      <HiPencil />
                      <span>Update</span>
                    </PopOver.PopButton>
                  </Modal.Open>
                  <Modal.Open window={laboratoryId}>
                    <PopOver.PopButton>
                      <HiTrash />
                      <span>Delete</span>
                    </PopOver.PopButton>
                  </Modal.Open>
                </PopOver.Window>
              </PopOver.Container>
            </Container>
          </Container>
          <SubText>{totalComputers} computers</SubText>
          <Description>{laboratoryDescription}</Description>
        </Body>
      </LabCard>
      <Modal.Window name={laboratoryId}>
        <ConfirmDelete onConfirm={handleDelete}>
          <p>Are you sure you want to continue?</p>
          <Warning>
            Deletion might result to permanently loss of data and information.
          </Warning>
        </ConfirmDelete>
      </Modal.Window>
    </>
  );
}

export default LaboratoryCard;
