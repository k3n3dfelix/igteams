import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { Header } from "../../components/Header";
import { Highlight } from "../../components/Higlight";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

import { Container } from "./styles";
export function Groups() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([
    "Amigos da Rocketseat",
    "Família",
    "Trabalho",
  ]);

  function handleNewGroup() {
    navigation.navigate("newGroup");
  }

  return (
    <Container>
      <Header />
      <StatusBar style="auto" />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        data={groups}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
