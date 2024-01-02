import styled from "styled-components";

const StyledLaboratories = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & > * {
    min-width: 20%;
  }
`;

const LabCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 1rem 1.5rem;
`;

function Laboratories() {
  return (
    <>
      <h1>All laboratories</h1>
      <StyledLaboratories>
        <LabCard>
          <div>
            <h1>Mac Lab</h1>
          </div>
          <div>
            <p>lab Id# 12323</p>
            <p>Computers: 6</p>
            <p>3 / 6 available</p>
            <p>3 / 6 unavailable </p>
          </div>
          <p>status</p>
        </LabCard>
      </StyledLaboratories>
    </>
  );
}

export default Laboratories;
