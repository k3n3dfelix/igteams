import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  //align-items: center;
  justify-content: center;
  background-color:${({ theme }) => theme.COLORS.GRAY_400};
  color: #fff;
  padding: 0px 20px;
  padding-top: 50px;;
`;

export const Text = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
`;
