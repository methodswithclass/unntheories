import { Card, Button, Flex, Text } from "@chakra-ui/react";
import { Authenticator } from "@aws-amplify/ui-react";
import { authGuard } from "app/services/auth";
import NavButton from "app/components/navbtn/NavButton";

const Login = () => {
  authGuard();
  return (
    <Flex direction="column" align="center" justify="center">
      <NavButton
        maxW="300px"
        margin="20px 0"
        name={"Home"}
        to={"/home"}
        background="black"
      />
      <div className="login">
        <Authenticator hideSignUp />
      </div>
    </Flex>
  );
};

export default Login;
