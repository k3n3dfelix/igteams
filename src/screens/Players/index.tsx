import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Highlight } from "../../components/Higlight";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { Input } from "../../components/Input";

import { AppError } from "utils/AppError";
import { playerAddByGroup } from "storage/players/playerAddByGroup";
import { playersGetByGroup } from "storage/players/playersGetByGroup";
import { playersGetByGroupAndTeam } from "storage/players/playerGetByGroupAndTeam";

import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { PlayerStorageDTO } from "storage/players/PlayerStorageDTO";
import { playerRemoveByGroup } from "storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};
export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  function handleNewGroup() {
    navigation.navigate("groups");
  }

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
      await playersGetByGroup(group);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        Alert.alert("Não foi possivel adicionar a pessoa ao time");
        console.log("error: ", error);
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover Pessoa", "Não foi possível remover essa pessoa.");
      console.log("error: ", error);
    }
  }
  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      );
      console.log("error: ", error);
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log("error", error);
      Alert.alert("Remover grupo", "Não foi possível remover o grupo!");
    }
  }
  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);
  return (
    <Container>
      <Header showBackbutton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          horizontal
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<ListEmpty message="Não há pessoas no time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
