import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "utils/AppError";

import { PLAYER_COLLECTION } from "storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    /*Example of the data structure
      @igteams: players-rocket: [player1, player2, player3]
      @igteams: players-amigos: [ player1, player2, player3, player4]
      @igteams: players-ignite: [ player1, player2, player3, player4, player5]
    */
    const storedPlayers = await playersGetByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já esta adicionada em um time aqui");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
