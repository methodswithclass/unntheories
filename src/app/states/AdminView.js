import { useState, useEffect } from "react";
import { Flex, Input, Textarea, Switch } from "@chakra-ui/react";
import Field from "app/components/Field";
import NavButton from "app/components/navbtn/NavButton";
import { authGuard } from "app/services/auth";
import { useCreateBlog, useListBlogs, useUpdateBlog } from "app/services/query";
import { useNavigate, useParams } from "react-router-dom";
import { keySort } from "app/utils/utils";
import { keyOrder } from "app/utils/constants";
import { pick } from "ramda";

const Component = ({ name, value, onChange }) => {
  switch (name) {
    case "content":
      return (
        <Textarea
          w="80%"
          h="500px"
          name={name}
          value={value}
          onChange={onChange}
        />
      );
    case "published":
      return (
        <Switch.Root
          name={name}
          checked={value}
          onClick={() => {
            onChange({ target: { value: !value } });
          }}
        >
          <Switch.Control />
        </Switch.Root>
      );
    default:
      return <Input w="30%" name={name} value={value} onChange={onChange} />;
  }
};

const AdminView = () => {
  authGuard();
  const { blog: name } = useParams();
  const navigate = useNavigate();

  const isEdit = !!name;

  const { data, isPending } = useListBlogs("1", { getAll: true });
  const { mutate } = isEdit ? useUpdateBlog() : useCreateBlog();

  const [state, setState] = useState(
    Object.keys(keyOrder).reduce(
      (accum, item) => ({ ...accum, [item]: "" }),
      {}
    )
  );
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (name) {
      window.scrollTo(0, 0);
    }
  }, [name]);

  const onChange = (key) => (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: key === "published" ? !!e.target.value : e.target.value || "",
      };
    });
  };

  const onSubmit = () => {
    mutate(state);
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  useEffect(() => {
    if (!data || !name) {
      return;
    }

    const blog = data.find((item) => item.name === name);
    if (blog) {
      setState(
        pick(
          [
            "content",
            "by",
            "name",
            "title",
            "description",
            "genre",
            "date",
            "published",
            "image",
          ],
          blog
        )
      );
    }
  }, [data, name]);

  if (isPending) {
    return "Loading...";
  }

  return (
    <Flex direction="column" w="80%" margin="20px">
      <NavButton w="100px" margin="20px 0" name="Back" to="/admin" />
      <NavButton
        w="100px"
        margin="20px 0"
        name="Submit"
        background="green"
        onClick={onSubmit}
      />
      {Object.entries(state)
        .sort(keySort)
        .map(([key, value]) => (
          <Field
            key={key}
            label={`${key.slice(0, 1).toUpperCase()}${key.slice(1)}`}
            required
            error={fieldErrors[key]}
            w="100%"
            h="auto"
            margin="20px 0"
          >
            <Component name={key} value={value} onChange={onChange(key)} />
          </Field>
        ))}
    </Flex>
  );
};

export default AdminView;
