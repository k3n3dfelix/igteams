import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  //align-items: center;
  justify-content: center;
  background-color:${({ theme }) => theme.COLORS.GRAY_400};
  color: #fff;
  padding: 0px 20px 20px 20px;
`;

export const Text = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
`;
