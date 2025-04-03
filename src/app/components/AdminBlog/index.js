import { Card, Button } from "@chakra-ui/react";

const Blog = ({ handler, blog }) => {
  return (
    <Card.Root
      width="320px"
      margin="30px"
      background="blue"
      color="white"
      onClick={handler}
      cursor="pointer"
    >
      <Card.Body gap="2">
        <Card.Title mt="2">{blog.name}</Card.Title>
        <Card.Description color="white">{blog.title}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button
          variant="outline"
          onClick={handler}
          background="dark-blue"
          color="white"
        >
          View
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Blog;
