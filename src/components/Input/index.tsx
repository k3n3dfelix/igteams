import { TextInputProps, TextInput } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}
export function Input({ inputRef, ...rest }: Props) {
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  return <Container ref={inputRef} placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}
