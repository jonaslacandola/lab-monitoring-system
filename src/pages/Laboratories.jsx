import styled from "styled-components";

import { useLaboratories } from "../features/laboratories/useLaboratories";

import LaboratoryCard from "../features/laboratories/LaboratoryCard";
import PopOver from "../ui/PopOver";
import Spinner from "../ui/Spinner";
import { HiOutlinePlus } from "react-icons/hi2";

const StyledLaboratories = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & > * {
    min-width: 35%;
  }
`;

const AddCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: white;
  cursor: pointer;
  transition: all ease-in-out 200ms;

  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 1.5rem 1rem;

  &:hover {
    background-color: var(--slate-50);
    & svg {
      color: var(--slate-300);
    }
  }

  & svg {
    font-size: 2rem;
    color: var(--slate-400);
    transition: all ease-in-out 200ms;
  }
`;

function Laboratories() {
  const { isLoadingLaboratories, laboratories } = useLaboratories();

  return (
    <>
      {isLoadingLaboratories && <Spinner />}
      <h1>All laboratories</h1>
      <PopOver>
        <StyledLaboratories>
          {laboratories?.map((laboratory) => (
            <LaboratoryCard
              key={laboratory.laboratoryId}
              laboratory={laboratory}
            />
          ))}
          <AddCard>
            <HiOutlinePlus />
          </AddCard>
        </StyledLaboratories>
      </PopOver>
    </>
  );
}

export default Laboratories;
