import { useState } from "react";
import { formatCurrency } from "../../utils/helper";
import { HiSquare2Stack, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import ModalCompound from "../../ui/ModalCompound";
import DeleteCabin from "../../ui/DeleteCabin";
import Table from "../../ui/Table";
import MenuCompound from "../../ui/MenuCompound";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "sono";
`;

const Capacity = styled.div`
  color: var(--color-grey-600);
  font-family: "sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  align-items: center;
  grid-column-gap: 2.4rem;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableButton = styled.div`
  display: flex;

  gap: 0.5rem;
  justify-content: center;
  align-content: center;

  & button {
    border: none;
    background-color: transparent;
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    color: var(--color-indigo-700);
  }

  & span svg {
    color: var(--color-red-700);
  }
`;

export default function CabinRow({ cabins }) {
  const [showEdit, setShowEdit] = useState(false);
  const {
    id: cabinId,
    discount,
    regularPrice,
    image,
    name,
    maxCapacity,
    description,
  } = cabins;

  const { deletingCabin } = useDeleteCabin();
  const { createCabin: duplicateCabin } = useCreateCabin();

  const handleDuplicate = () => {
    duplicateCabin({
      name: `Copy of ${name}`,
      discount,
      regularPrice,
      maxCapacity,
      description,
      image,
    });
  };

  return (
    <>
      <Table.TableRow columns="0.6fr 1.8fr 2.2fr repeat(3, 1fr)">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Capacity>fit up to {maxCapacity} guest</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount === 0 ? (
          <span>&mdash;</span>
        ) : (
          <Discount>{formatCurrency(discount)}</Discount>
        )}
        <TableButton>
          <button onClick={() => handleDuplicate()}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowEdit((data) => !data)}>
            <HiMiniPencilSquare />
          </button>

          <ModalCompound>
            <ModalCompound.Open opens="edit-form">
              <button>
                <HiMiniPencilSquare />
              </button>
            </ModalCompound.Open>
            <ModalCompound.WindowModal name="edit-form">
              <CreateCabinForm cabinEdit={cabins} />
            </ModalCompound.WindowModal>

            <ModalCompound.Open opens="delete-cabin">
              <button>
                <span>
                  <HiTrash />
                </span>
              </button>
            </ModalCompound.Open>
            <ModalCompound.WindowModal name="delete-cabin">
              <DeleteCabin resourceName={cabins} onConfirm={deletingCabin} />
            </ModalCompound.WindowModal>
          </ModalCompound>

          <MenuCompound.Menu>
            <MenuCompound.Toggle id={cabinId} />
            <MenuCompound.List id={cabinId}>
              <MenuCompound.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleDuplicate()}
              >
                Duplicate
              </MenuCompound.Button>
              <MenuCompound.Button icon={<HiMiniPencilSquare />}>
                Edit
              </MenuCompound.Button>
              <MenuCompound.Button icon={<HiTrash />}>
                Delete
              </MenuCompound.Button>
            </MenuCompound.List>
          </MenuCompound.Menu>

          <button onClick={() => deletingCabin(cabinId)}>
            <span>
              <HiTrash />
            </span>
          </button>
        </TableButton>
      </Table.TableRow>

      {showEdit && <CreateCabinForm cabinEdit={cabins} />}
    </>
  );
}
