import { cloneElement, createContext, useContext, useState } from "react";
import { Button, Overlay, StyleModal } from "./Modal";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useCloseRef } from "../hooks/useCloseRef";

const ModalCompoundProvider = createContext();

export default function ModalCompound({ children }) {
  const [openName, setName] = useState("");

  const close = () => setName("");
  const open = setName;

  const value = {
    close,
    open,
    openName,
  };
  return (
    <ModalCompoundProvider.Provider value={value}>
      {children}
    </ModalCompoundProvider.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalCompoundProvider);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function WindowModal({ name, children }) {
  const { openName, close } = useContext(ModalCompoundProvider);
  const { ref: targetClose } = useCloseRef(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyleModal ref={targetClose}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyleModal>
    </Overlay>,
    document.body
  );
}

//add child Component  as property  component

ModalCompound.Open = Open;
ModalCompound.WindowModal = WindowModal;
