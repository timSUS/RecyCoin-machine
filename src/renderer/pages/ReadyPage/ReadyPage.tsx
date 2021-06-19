import { FC, memo } from "react";
import Button from "~renderer/components/Button/Button";
import { Link } from "react-router-dom";
import RowWrapper from "~renderer/components/RowWrapper/RowWrapper";
import TextContent from "~renderer/components/TextContent/TextContent";
import ContentWrapper from "~root/renderer/components/ContentWrapper/ContentWrapper";

const ReadyPage: FC = (): JSX.Element => {
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
