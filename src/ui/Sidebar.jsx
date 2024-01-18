import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";
import { HiOutlineUserGroup } from "react-icons/hi2";

const StyledSidebar = styled.aside`
  background-color: var(--slate-800);
  grid-row: -1 / 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <StyledNavLink to={"/student/attendance"} icon={<HiOutlineUserGroup />}>
        Attendance
      </StyledNavLink>
    </StyledSidebar>
  );
}

export default Sidebar;
