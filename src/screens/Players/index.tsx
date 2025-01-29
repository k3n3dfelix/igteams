import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Highlight } from "../../components/Higlight";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { Input } from "../../components/Input";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";

type RouteParams = {
  group: string;
}
export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Pessoa A", "Pessoa B", "Pessoa C"]);

  function handleNewGroup() {
    navigation.navigate("groups");
  }
  
  return (
    <Container>
      <Header showBackbutton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          horizontal
          data={["Time A", "Time Bs"]}
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
        keyExtractor={(item) => item}
        ListEmptyComponent={<ListEmpty message="Não há pessoas no time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
      />

      <Button title="Remover Turma" type="SECONDARY" onPress={handleNewGroup} />
    </Container>
  );
}
