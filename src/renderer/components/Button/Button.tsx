import styled from "@emotion/styled";
import { FC } from "react";

interface ButtonProperties {
  text: string;
}

const ButtonWrapper = styled.div`
  border-radius: 15px;
  min-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #38a3a5;
  width: fit-content;
  padding: 20px;
  color: #fff;
`;

const Button: FC<ButtonProperties> = ({
  text,
}: ButtonProperties): JSX.Element => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

export default Button;
