import React from "react";

import CreateAccountForm from "./components/CreateAccountForm";
import Container from "../../shared/components/Container/Container";

const CreateAccountScreen: React.FC = () => {
  return (
    <Container statusBarStyle="auto">
      <CreateAccountForm />
    </Container>
  );
};

export default CreateAccountScreen;
