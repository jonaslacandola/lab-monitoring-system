import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all ease-in-out 300ms;

  ${(props) =>
    props.type === "primary" &&
    css`
      color: var(--slate-600);
      padding: 14px 18px;

      &:hover,
      &.active {
        color: var(--slate-50);
        background-color: var(--slate-900);
      }
      &:focus {
        outline: 2px solid var(--blue-500);
      }
      & svg {
        transition: all ease-in-out 200ms;
      }
      &:hover svg,
      &.active svg {
        color: #3b82f6;
      }
    `}
  ${(props) =>
    props.type === "icon" &&
    css`
      color: var(--slate-800);
      padding: 8px;

      &:hover,
      &.active {
        background-color: var(--gray-100);
      }
    `}
    &
    svg {
    font-size: 24px;
  }
`;

StyledLink.defaultProps = {
  type: "primary",
};

function StyledNavLink({ children, icon, to, type }) {
  return (
    <StyledLink to={to} type={type}>
      {icon}
      {children && <span>{children}</span>}
    </StyledLink>
  );
}

export default StyledNavLink;
