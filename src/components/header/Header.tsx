import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { Logo } from "../logo/Logo";
import { ElementHeader, HeaderContainer } from "./Header.style";
import { routes } from "../../routes";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();

  const [showLoginButton, setShowLoginButton] = useState(true);

  const handleClick = () => {
    navigate(routes.login);
  };

  return (
    <ElementHeader>
      <HeaderContainer>
        <Logo />
        {showLoginButton && <Button onClick={handleClick}>Login</Button>}
      </HeaderContainer>
    </ElementHeader>
  );
};
