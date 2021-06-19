import styled from "@emotion/styled";
import { FC } from "react";
import { useTranslation, UseTranslationResponse } from "react-i18next";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 54px;
  font-weight: 700;
  background: radial-gradient(
    51.64% 692.8% at 74.26% 49.71%,
    #22577a 0%,
    #38a3a5 100%
  );
  margin-top: 15px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
`;

const Logo: FC = (): JSX.Element => {
  const { t }: UseTranslationResponse<string> = useTranslation();
  return <LogoWrapper>{t("common.logoText")}</LogoWrapper>;
};

export default Logo;
