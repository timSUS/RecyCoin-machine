import { Global, css } from "@emotion/react";
import { FC, memo } from "react";

const GlobalStyle: FC = (): JSX.Element => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Roboto";
          src: url(${process.env.PUBLIC_URL}/fonts/Roboto/Roboto-Regular.ttf);
          font-weight: 400;
          font-style: normal;
        }
        *,
        *::after,
        *::before {
          box-sizing: border-box;
          margin: 0;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: "Roboto", sans-serif;
        }
        a {
          text-decoration: none;
        }
      `}
    />
  );
};

export default memo(GlobalStyle);
