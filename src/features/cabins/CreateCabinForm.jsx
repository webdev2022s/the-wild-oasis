import { useForm } from "react-hook-form";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/Fileinput";

export default function CreateCabinForm({ cabinEdit = {}, onCloseModal }) {
  const { id: cabinEditId, ...editValues } = cabinEdit;

  const isEditing = Boolean(cabinEditId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;

  const { createCabin, isPending } = useCreateCabin();
  const { updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing)
      updateCabin(
        { newCabin: { ...data, image }, id: cabinEditId },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  // function onError(err) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum of 1 guest ",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 20,
              message: "Our Available price as low as 20 dollar only",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required ",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount price should not greater than Regular price",
          })}
        />
      </FormRow>

      <FormRow label={"Description for website"}>
        <Textarea
          type="number"
          id="description"
          defaultValue={""}
          {...register("description")}
        />
      </FormRow>

      <FormRow label={"Cabin Photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditing ? "Update Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
