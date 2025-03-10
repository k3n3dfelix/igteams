import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLLECTION, PLAYER_COLLECTION } from "storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { Groups } from "@screens/Groups";

export async function groupRemoveByName(groupName: string){
  try{
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter(group => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}=${groupName}`);

  }catch(error){
    throw new Error;
  }
} 