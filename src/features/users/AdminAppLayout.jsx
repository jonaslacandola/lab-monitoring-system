import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  height: 100dvh;
  width: 100%;
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--gray-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AdminAppLayout() {
  return (
    <StyledAppLayout>
      <AdminHeader />
      <AdminSidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AdminAppLayout;
