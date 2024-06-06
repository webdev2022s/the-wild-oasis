import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  const [modalCabin, setModalCabin] = useState(false);
  return (
    <>
      <Button onClick={() => setModalCabin((data) => !data)}>+Add Cabin</Button>
      {modalCabin && (
        <Modal onCloseModal={setModalCabin}>
          <CreateCabinForm onCloseModal={() => setModalCabin(false)} />
        </Modal>
      )}
    </>
  );
}
