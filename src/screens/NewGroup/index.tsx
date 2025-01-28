import { useNavigation } from "@react-navigation/native";
import { Highlight } from "../../components/Higlight";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { Container, Content, Icon } from "./styles";
import { Input } from "../../components/Input";

export function NewGroup() {
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("players", { group: "Nova turma" });
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
        <Input placeholder="Nome da turma" />
        <Button
          title="Criar turma"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
