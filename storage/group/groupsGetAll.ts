import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLLECTION } from "../storageConfig";

export async function groupsGetAll(){
  try{
    const storage = await AsyncStorage.getItem(GROUP_COLLLECTION);
    const groups : string[] = storage ? JSON.parse(storage) : [];

    return groups;
  }catch(error){
    throw error;
  }
}