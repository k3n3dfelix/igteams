import React from "react";
import Text from "react-native";
import { CaretLeft } from "phosphor-react-native";

import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackbutton?: boolean;
};
export function Header({ showBackbutton = false }: Props) {
  return (
    <Container>
      {showBackbutton && (
        <BackButton>
          <BackIcon color="#FFF" size={32} />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
