import { FC } from "react";
import RowWrapper from "~renderer/components/RowWrapper/RowWrapper";
import TextContent from "~root/renderer/components/TextContent/TextContent";
import { mdiCellphoneNfc, mdiQrcodeScan } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Button from "~root/renderer/components/Button/Button";
import ContentWrapper from "~renderer/components/ContentWrapper/ContentWrapper";

const ScanPage: FC = (): JSX.Element => {
  return (
    <>
      <ContentWrapper>
        <RowWrapper>
          <TextContent content="Teraz przyłóż kartę lub telefon z aplikacją do czytnika NFC" />
        </RowWrapper>
        <Icon path={mdiCellphoneNfc} size={5} color="#111" />
        <RowWrapper>
          <TextContent content="LUB zeskanuj kod QR portfela" />
        </RowWrapper>
        <Icon path={mdiQrcodeScan} size={5} color="#111" />
      </ContentWrapper>
      {window.api?.isDevelopment && (
        <Link to="/throw">
          <Button text="Dalej" />
        </Link>
      )}
    </>
  );
};

export default ScanPage;
