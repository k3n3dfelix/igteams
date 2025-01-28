import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  return <Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}
