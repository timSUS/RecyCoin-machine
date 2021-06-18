import { FC, memo } from "react";
import Logo from "~renderer/components/Logo/Logo";
import Button from "~renderer/components/Button/Button";

const HomePage: FC = (): JSX.Element => {
  return (
    <>
      <Logo />
      <Button text="Zapraszamy" />
    </>
  );
};

export default memo(HomePage);
