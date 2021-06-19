import styled from "@emotion/styled";
import { FC } from "react";
import { useTranslation, UseTranslationResponse } from "react-i18next";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 54px;
  background: linear-gradient(to left, #22577a, #38a3a5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Logo: FC = (): JSX.Element => {
  const { t }: UseTranslationResponse<string> = useTranslation();
  return <LogoWrapper>{t("common.logoText")}</LogoWrapper>;
};

export default Logo;
