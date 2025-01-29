import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "../../utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if(groupAlreadyExists){
      throw new AppError("Já existe um grupo já cadastrado com esse nome.");
    }

    const storageToSave = JSON.stringify([...storedGroups, newGroupName]);
   
    await AsyncStorage.setItem(GROUP_COLLLECTION, storageToSave);
  } catch (error) {
    throw error;
  }
}
