import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledList = styled.ul`
  display: flex;
  gap: 0.2rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledList>
      <li>
        <ButtonIcon type="yellow" onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledList>
  );
}
