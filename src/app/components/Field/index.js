import { Field, Flex } from "@chakra-ui/react";

const Component = ({ children, label, required, error, ...rest }) => {
  return (
    <Flex {...rest}>
      <Field.Root>
        <Field.Label>
          {label}
          {required && <Field.RequiredIndicator />}
        </Field.Label>
        {children}
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
    </Flex>
  );
};

export default Component;
