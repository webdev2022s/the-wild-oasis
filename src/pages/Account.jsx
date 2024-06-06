import PasswordUpdate from "../features/authentication/PasswordUpdate";
import UpdateUserData from "../features/authentication/UpdateUserData";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account information</Heading>
      <Row>
        <Heading as="h3">Update your data</Heading>
        <UpdateUserData />
      </Row>

      <Row>
        <Heading as="h3"> Update password</Heading>
        <PasswordUpdate />
      </Row>
    </>
  );
}

export default Account;
