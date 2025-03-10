import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, groupName: string){
  try{
    const storagePlayers = await playersGetByGroup(groupName);
    const filtered = storagePlayers.filter(player => player.name !== playerName);
    const storage = JSON.stringify(filtered);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, storage);
  }catch(error){
    throw new Error;
  }
}