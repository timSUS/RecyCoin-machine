import styled from "@emotion/styled";
import { FC } from "react";

interface ButtonProperties {
  text: string;
}

const ButtonWrapper = styled.div`
  border-radius: 15px;
  min-height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #38a3a5;
  width: fit-content;
  padding: 5px 15px;
  color: #fff;
  cursor: pointer;
`;

const Button: FC<ButtonProperties> = ({
  text,
}: ButtonProperties): JSX.Element => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

export default Button;
