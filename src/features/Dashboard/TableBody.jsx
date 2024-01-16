import styled from "styled-components";

const Message = styled.p`
  padding-bottom: 1rem;
`;

const Body = styled.div`
  overflow-y: scroll;
  max-height: 12rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & p {
    margin-top: 1rem;
    color: var(--slate-500);
  }
`;

function TableBody({ data, render }) {
  if (!data?.length)
    return (
      <Container>
        <Message>There are no attendances today.</Message>
      </Container>
    );

  if (data?.length) return <Body>{data?.map(render)}</Body>;
}

export default TableBody;
