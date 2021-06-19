import styled from "@emotion/styled";

interface TextContentProperties extends TextContentWrapperProperties {
  content: string;
}

interface TextContentWrapperProperties {
  fontSize?: number | string;
}

const TextContentWrapper = styled.div<TextContentWrapperProperties>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "44px")};
  background: linear-gradient(to left, #22577a, #38a3a5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const TextContent = ({
  content,
  fontSize,
}: TextContentProperties): JSX.Element => {
  return <TextContentWrapper fontSize={fontSize}>{content}</TextContentWrapper>;
};

export default TextContent;
