import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Highlight } from "../../components/Higlight";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { Container, Content, Icon } from "./styles";
import { Input } from "../../components/Input";

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");
  
  function handleNewGroup() {
    navigation.navigate("players", { group: group });
  }

  return (
    <Container>
      <Header showBackbutton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma nova turma para jogar com seus amigos"
        />
        <Input placeholder="Nome da turma" onChangeText={text => setGroup(text)} />
        <Button
          title="Criar turma"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
