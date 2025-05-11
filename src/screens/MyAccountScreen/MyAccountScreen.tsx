import React from "react";

import { useAccountStore } from "../../store/useAccountStore";
import Container from "../../shared/components/Container/Container";
import AccountDetails from "./components/AccountDetails";
import Header from "./components/Header";

const MyAccountScreen: React.FC = () => {
  const account = useAccountStore((state) => state.account)!;

  return (
    <Container backgroundColor="#F5F7FF">
      <Header title="My Account" />
      <AccountDetails account={account} />
    </Container>
  );
};

export default MyAccountScreen;
