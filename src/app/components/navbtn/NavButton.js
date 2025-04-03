import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const NavButton = ({
  name,
  to,
  onClick,
  background = "blue",
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  const handler = () => {
    navigate(to);
  };

  return (
    <Button {...rest} background={background} onClick={onClick || handler}>
      <Text textStyle="sm">{children ? children : name}</Text>
    </Button>
  );
};

export default NavButton;
