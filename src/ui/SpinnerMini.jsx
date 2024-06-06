import { BiLoader } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    to{
        transform: rotate(1turn)
    }
`;

const SpinnerMini = styled(BiLoader)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
