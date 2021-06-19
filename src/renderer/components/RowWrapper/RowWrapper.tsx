import styled from "@emotion/styled";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type RowWrapperProperties = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const RowWrapper = styled.div<RowWrapperProperties>`
  display: flex;
`;

export default RowWrapper;
