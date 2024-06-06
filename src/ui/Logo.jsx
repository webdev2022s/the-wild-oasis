import styled from "styled-components";
import logoWild from "../assets/logo-light.png";
import logoWilddark from "../assets/logo-dark.png";
import { useDarkMode } from "../context/DarkModeContextProvider";

const StyleLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? logoWilddark : logoWild;
  return (
    <StyleLogo>
      <Img src={src} alt="Main Logo" />
    </StyleLogo>
  );
}

export default Logo;
