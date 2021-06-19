/* eslint-disable @typescript-eslint/triple-slash-reference */
///<reference path="../../../../global.d.ts" />

import { FC, memo } from "react";
import { Link } from "react-router-dom";
import HomePageText from "~assets/svg/HomePageText.svg";
import Button from "~renderer/components/Button/Button";

const HomePage: FC = (): JSX.Element => {
  return (
    <>
      <HomePageText width={400} height={350} />
      <Link to="/scan">
        <Button text="Zaczynamy" />
      </Link>
    </>
  );
};

export default memo(HomePage);
