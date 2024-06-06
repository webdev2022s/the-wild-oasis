import Button from "../../ui/Button";
import ModalCompound from "../../ui/ModalCompound";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabinCompound() {
  return (
    <>
      <ModalCompound>
        <ModalCompound.Open opens="cabin-form">
          <Button>Compound +Add Cabin</Button>
        </ModalCompound.Open>
        <ModalCompound.WindowModal name="cabin-form">
          <CreateCabinForm />
        </ModalCompound.WindowModal>
      </ModalCompound>

      <ModalCompound>
        <ModalCompound.Open opens="cabin-table">
          <Button>Compound +show table</Button>
        </ModalCompound.Open>
        <ModalCompound.WindowModal name="cabin-table">
          <CabinTable />
        </ModalCompound.WindowModal>
      </ModalCompound>
    </>
  );
}
