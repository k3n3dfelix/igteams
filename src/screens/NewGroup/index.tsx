import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "../../../storage/group/groupCreate";
import { AppError } from "../../../utils/AppError";

import { Highlight } from "../../components/Higlight";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Content, Icon } from "./styles";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");

  async function handleNewGroup() {
    try {

      if(group.trim().length === 0){
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo');
      }
      
      await groupCreate(group);
      navigation.navigate("players", { group: group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Não foi possivel criar um novo grupo. ");
        console.log("error: ", error);
      }
    }
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
        <Input
          placeholder="Nome da turma"
          onChangeText={(text) => setGroup(text)}
        />
        <Button
          title="Criar turma"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
