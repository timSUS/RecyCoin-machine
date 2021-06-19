import { Global, css } from "@emotion/react";
import { FC, memo } from "react";

const GlobalStyle: FC = (): JSX.Element => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Montserrat";
          src: url(/static/fonts/Montserrat/Montserrat-Bold.ttf);
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: "Montserrat";
          src: url(/static/fonts/Montserrat/Montserrat-Bold.ttf);
          font-weight: 700;
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
          font-family: "Montserrat", sans-serif;
          user-select: none;
          overflow: hidden;
        }
        a {
          text-decoration: none;
        }
      `}
    />
  );
};

export default memo(GlobalStyle);
