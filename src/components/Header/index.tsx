import React from "react";
import { useNavigation } from "@react-navigation/native";
import Text from "react-native";
import { CaretLeft } from "phosphor-react-native";

import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackbutton?: boolean;
};
export function Header({ showBackbutton = false }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups');
  }
  return (
    <Container>
      {showBackbutton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon color="#FFF" size={32} />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
