import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/Fileinput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useGetUser from "./useGetUser";
import useUpdateuser from "./useUpdateUser";

export default function UpdateUserData() {
  const {
    defaultEmail,
    currentUser: { user_metadata: { email, fullName: currentFullName } = {} },
  } = useGetUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { isPending, updateUser } = useUpdateuser();

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  const handleCancelEvent = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };
  return (
    <Form onSubmit={handleSubmitUpdate}>
      <FormRow label={"Email address:"}>
        <Input type="email" id="email" value={email || defaultEmail} disabled />
      </FormRow>
      <FormRow label={"Full Name:"}>
        <Input
          type="text"
          id="fullName"
          value={fullName}
          disabled={isPending}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>
      <FormRow label={"Avatar:"}>
        <FileInput
          accept="image/*"
          id="avatar"
          disabled={isPending}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          $variations="secondary"
          disabled={isPending}
          type="reset"
          onClick={handleCancelEvent}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Update Informations</Button>
      </FormRow>
    </Form>
  );
}
