import { FC, memo } from "react";
import Button from "~renderer/components/Button/Button";
import { Link } from "react-router-dom";
import RowWrapper from "~renderer/components/RowWrapper/RowWrapper";
import TextContent from "~renderer/components/TextContent/TextContent";

const ReadyPage: FC = (): JSX.Element => {
  return (
    <>
      <RowWrapper>
        <TextContent content="Gratulacje!" />
      </RowWrapper>
      <RowWrapper>
        <TextContent content="Otrzymałeś właśnie:" />
      </RowWrapper>
      <RowWrapper>
        <TextContent content="15" />
      </RowWrapper>
      <RowWrapper>
        <TextContent content="RecyCoinów" />
      </RowWrapper>
      <Link to="/">
        <Button text="Gotowe" />
      </Link>
    </>
  );
};

export default memo(ReadyPage);
