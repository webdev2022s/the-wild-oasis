import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 900;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 400;
    `}
    line-height: 1.2;

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
      text-align: center;
    `}
`;

export default Heading;
