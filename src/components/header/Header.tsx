import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { Logo } from "../logo/Logo";
import { ElementHeader, HeaderContainer } from "./Header.style";
import { routes } from "../../routes";

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.login);
  };

  return (
    <ElementHeader>
      <HeaderContainer>
        <Logo />
        <Button onClick={handleClick}>Login</Button>
      </HeaderContainer>
    </ElementHeader>
  );
};
