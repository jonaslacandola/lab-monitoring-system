import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Warning = styled.span`
  color: var(--red-500);
`;

function PageNotAvailable() {
  return (
    <Container>
      <Warning>Page not available.</Warning>
      <p>
        You have limited access to this site, only administrators are allowed.
      </p>
    </Container>
  );
}

export default PageNotAvailable;
