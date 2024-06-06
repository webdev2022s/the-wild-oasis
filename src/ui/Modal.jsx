import { createPortal } from "react-dom";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useCloseRef } from "../hooks/useCloseRef";

export const StyleModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: var(--backdrop-color);
  z-index: 1000;
  backdrop-filter: blur(4px);
  transition: all 0.5s;
`;

export const Button = styled.button`
  background-color: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translate(0.8rem);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  & svg {
    fill: var(--color-grey-100);
  }
`;

export default function Modal({ children, onCloseModal }) {
  const { ref } = useCloseRef(onCloseModal);
  return createPortal(
    <Overlay>
      <StyleModal ref={ref}>
        <Button onClick={() => onCloseModal(false)}>
          <HiXMark />
        </Button>

        {children}
      </StyleModal>
    </Overlay>,
    document.body
  );
}
