import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseRef } from "../hooks/useCloseRef";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyleToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  & svg {
    fill: var(--color-indigo-700);
    width: 2.4rem;
    height: 2.4rem;
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;

  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-${(props) => props.$type}-700);
    transition: all 0.3s;
  }
`;
const MenuCompoundContext = createContext();

export default function MenuCompound({ children }) {
  const [openId, setOpenId] = useState("");
  const [posistion, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  const value = {
    openId,
    close,
    open,
    posistion,
    setPosition,
  };
  return (
    <MenuCompoundContext.Provider value={value}>
      {children}
    </MenuCompoundContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { open, close, openId, setPosition } = useContext(MenuCompoundContext);
  function handleToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 5,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyleToggle onClick={(e) => handleToggle(e)}>
      <HiEllipsisVertical />
    </StyleToggle>
  );
}

function List({ id, children }) {
  const { openId, posistion, close } = useContext(MenuCompoundContext);
  const { ref } = useCloseRef(close, false);
  if (openId !== id) return null;
  return createPortal(
    <StyledList $position={posistion} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, color }) {
  const { close } = useContext(MenuCompoundContext);
  function handleOnClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handleOnClick} $type={color}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

MenuCompound.Menu = Menu;
MenuCompound.Toggle = Toggle;
MenuCompound.List = List;
MenuCompound.Button = Button;
