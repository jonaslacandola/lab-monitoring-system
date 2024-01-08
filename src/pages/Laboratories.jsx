import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";

import { useLaboratories } from "../features/laboratories/useLaboratories";

import LaboratoryCard from "../features/laboratories/LaboratoryCard";
import PopOver from "../ui/PopOver";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import CreateLaboratoryForm from "../features/laboratories/CreateLaboratoryForm";
import Menu from "../ui/Menu";
import EmptyPage from "../ui/EmptyPage";

const StyledLaboratories = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function Laboratories() {
  const { isLoadingLaboratories, laboratories } = useLaboratories();

  return (
    <>
      {isLoadingLaboratories && <Spinner />}
      <Modal>
        <Container>
          <h1>All laboratories</h1>
          <Container>
            <Menu>
              <Modal.Open window={"addLabForm"}>
                <Menu.Button>
                  <span>Add</span>
                  <HiOutlinePlus />
                </Menu.Button>
              </Modal.Open>
            </Menu>
          </Container>
        </Container>
        {!isLoadingLaboratories && (
          <PopOver>
            <StyledLaboratories>
              {!laboratories.length && <EmptyPage />}
              {laboratories?.map((laboratory) => (
                <LaboratoryCard
                  key={laboratory.laboratoryId}
                  laboratory={laboratory}
                />
              ))}
            </StyledLaboratories>
          </PopOver>
        )}
        <Modal.Window position={"right"} name={"addLabForm"}>
          <CreateLaboratoryForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Laboratories;
