import styled from "styled-components";

const StyledEmptyPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function EmptyPage() {
  return (
    <StyledEmptyPage>
      <span>Page is empty, start by adding an item.</span>
    </StyledEmptyPage>
  );
}

export default EmptyPage;
