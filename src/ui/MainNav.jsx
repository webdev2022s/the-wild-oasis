import { NavLink } from "react-router-dom";

import { HiOutlineHome, HiOutlineCalendar } from "react-icons/hi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";

import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContextProvider";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 0.8rem;
    align-items: center;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: ${(props) =>
      props.$active ? "var(--color-brand-500)" : "var(--color-brand-200)"};
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-indigo-700);
  }
`;

function MainNav() {
  const { isDarkMode } = useDarkMode();
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={"/dashboard"} $active={isDarkMode}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/booking"} $active={isDarkMode}>
            <HiOutlineCalendar />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/cabins"} $active={isDarkMode}>
            <HiOutlineBuildingOffice2 />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/User"} $active={isDarkMode}>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/setting"} $active={isDarkMode}>
            <HiOutlineCog8Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
