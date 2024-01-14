import styled from "styled-components";
import StyledNavLink from "../../ui/StyledNavLink";
import {
  HiOutlineBuildingOffice,
  HiOutlineSquare3Stack3D,
  HiOutlineTv,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const StyledSidebar = styled.aside`
  background-color: var(--slate-800);
  grid-row: -1 / 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function AdminSidebar() {
  return (
    <StyledSidebar>
      <StyledNavLink to={"/admin/dashboard"} icon={<HiOutlineSquare3Stack3D />}>
        Dashboard
      </StyledNavLink>
      <StyledNavLink to={"/admin/computer"} icon={<HiOutlineTv />}>
        Computer
      </StyledNavLink>
      <StyledNavLink
        to={"/admin/laboratory"}
        icon={<HiOutlineBuildingOffice />}
      >
        Laboratory
      </StyledNavLink>
      <StyledNavLink to={"/admin/admin"} icon={<HiOutlineUserGroup />}>
        Admin
      </StyledNavLink>
    </StyledSidebar>
  );
}

export default AdminSidebar;
