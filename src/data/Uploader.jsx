import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { useUploadData } from "./apiSupabase";

const UploaderStyle = styled.div`
  margin-top: auto;
  background-color: var(--color-indigo-100);
  padding: 8px 0.2rem;
  border-radius: var(--border-radius-sm);
  text-align: center;
  font-size: 1.2rem;

  & button {
    font-size: 1.2rem;
  }
`;

export default function Uploader() {
  const { isLoading, uploadAll, uploadBookings, deletingBucket } =
    useUploadData();
  return (
    <UploaderStyle>
      <Heading as={"h2"}>Dev Area</Heading>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload all sample Data
      </Button>
      <p>Only run this only once!</p>
      <p>
        <em>(Cabin images need to be uploaded manually)</em>
      </p>
      <hr />
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload current bookings
      </Button>
      <p>You can run this every day you develop the app</p>
      {/* <hr /> */}
      {/* <Button onClick={deletingBucket} disabled={isLoading}>
        Delete Bucket
      </Button>{" "} */}
    </UploaderStyle>
  );
}
