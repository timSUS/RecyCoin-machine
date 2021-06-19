import { FC, memo, useEffect } from "react";
import Button from "~renderer/components/Button/Button";
import { Link } from "react-router-dom";
import RowWrapper from "~renderer/components/RowWrapper/RowWrapper";
import TextContent from "~renderer/components/TextContent/TextContent";
import ContentWrapper from "~root/renderer/components/ContentWrapper/ContentWrapper";
import { isDisabledGlobal } from "~renderer/stores/globalStore/globalStore";
import { useState } from "@hookstate/core";

const ReadyPage: FC = (): JSX.Element => {
  const isDisabled = useState(isDisabledGlobal);
  useEffect(() => {
    if (isDisabled.get()) {
      const speaker = new SpeechSynthesisUtterance(
        "Gratulacje! Otrzymałeś właśnie 15 RecyCoinów.",
      );
      window.speechSynthesis.speak(speaker);
    }
  }, [isDisabled.get()]);
  return (
    <>
      <ContentWrapper>
        <RowWrapper>
          <TextContent content="Gratulacje!" fontSize="38px" />
        </RowWrapper>
        <RowWrapper>
          <TextContent content="Otrzymałeś właśnie:" />
        </RowWrapper>
        <RowWrapper>
          <TextContent content="15" fontSize="32px" />
        </RowWrapper>
        <RowWrapper>
          <TextContent content="RecyCoinów" />
        </RowWrapper>
      </ContentWrapper>
      <Link to="/">
        <Button text="Gotowe" />
      </Link>
    </>
  );
};

export default memo(ReadyPage);
