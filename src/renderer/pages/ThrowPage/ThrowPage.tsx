import { FC, memo } from "react";
import Button from "~renderer/components/Button/Button";
import { Link } from "react-router-dom";
import RowWrapper from "~renderer/components/RowWrapper/RowWrapper";
import TextContent from "~renderer/components/TextContent/TextContent";
import { mdiBottleSoda } from "@mdi/js";
import Icon from "@mdi/react";
import ContentWrapper from "~renderer/components/ContentWrapper/ContentWrapper";

const ThrowPage: FC = (): JSX.Element => {
  return (
    <>
      <ContentWrapper>
        <RowWrapper>
          <TextContent content="Teraz wrzuć butelki" />
        </RowWrapper>
        <Icon path={mdiBottleSoda} size={5} color="#111" />
      </ContentWrapper>
      <Link to="/ready">
        <Button text="Gotowe" />
      </Link>
    </>
  );
};

export default memo(ThrowPage);
