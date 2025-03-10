import { useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import { Header } from "../../components/Header";
import { Highlight } from "../../components/Higlight";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

import { Container } from "./styles";
import { GROUP_COLLLECTION } from "../../../storage/storageConfig";
import { groupsGetAll } from "../../../storage/group/groupsGetAll";

export function Groups() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([
    "Amigos da Rocketseat",
    "Família",
    "Trabalho",
  ]);

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      throw error;
    }
  }

  function handleNewGroup() {
    navigation.navigate("newGroup");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );
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
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)}/>}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
