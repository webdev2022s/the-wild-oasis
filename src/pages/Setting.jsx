import SettingForm from "../features/settings/SettingForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Setting() {
  return (
    <Row>
      <Heading as="h1">Hotel Settings </Heading>
      <SettingForm />
    </Row>
  );
}

export default Setting;
