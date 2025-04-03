import { Flex, Text } from "@chakra-ui/react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { authGuard } from "app/services/auth";
import { useListBlogs } from "app/services/query";
import NavButton from "app/components/navbtn/NavButton";
import AdminBlog from "app/components/AdminBlog";

const AdminList = () => {
  authGuard();

  const { signOut } = useAuthenticator();
  const navigate = useNavigate();

  const { data, isPending } = useListBlogs("1", { getAll: true });

  const handler = (name) => () => {
    navigate(`${name}`);
  };

  if (isPending) {
    return "Loading...";
  }

  const published = data.filter((item) => item.published);
  const unpublished = data.filter((item) => !item.published);

  return (
    <Flex direction="column" w="100%">
      <Flex
        direction="row"
        backgroundColor="gray"
        w="100%"
        h="200px"
        justify="space-around"
        align="center"
      >
        <NavButton
          w="300px"
          margin="0 20px"
          name={"Home"}
          to={"/home"}
          background="black"
        />
        <NavButton
          w="300px"
          margin="0 20px"
          name={"Create"}
          to={"create"}
          background="green"
        />
        <NavButton
          w="300px"
          margin="0 20px"
          name={"Signout"}
          onClick={() => {
            signOut();
          }}
          background="#932626"
        />
      </Flex>
      <Text w="80%" margin="50px" borderBottom="1px solid black">
        Published
      </Text>
      <Flex direction="row" wrap="wrap" w="100%" margin="0 20px">
        {published.map((item) => (
          <AdminBlog key={item.name} handler={handler(item.name)} blog={item} />
        ))}
      </Flex>
      <Text w="80%" margin="50px" borderBottom="1px solid black">
        Unpublished
      </Text>
      <Flex direction="row" wrap="wrap" w="100%" margin="0 20px">
        {unpublished.map((item) => (
          <AdminBlog key={item.name} handler={handler(item.name)} blog={item} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AdminList;
