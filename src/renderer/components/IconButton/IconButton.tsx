import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface IconButtonProperties
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: string;
  alt: string;
}

const IconButtonWrapper = styled.div`
  border-radius: 15px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #22577a;
  width: 50px;
  padding: 5px;
  color: #fff;
  cursor: pointer;
`;

const IconButton: FC<IconButtonProperties> = ({
  icon,
  alt,
  ...rest
}: IconButtonProperties): JSX.Element => {
  return (
    <IconButtonWrapper title={alt} aria-label={alt} {...rest}>
      <Icon path={icon} size={1} color="#fff" />
    </IconButtonWrapper>
  );
};

export default IconButton;
