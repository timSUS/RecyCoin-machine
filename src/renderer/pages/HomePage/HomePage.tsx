import { FC, memo } from "react";
import Logo from "~renderer/components/Logo/Logo";
import Button from "~renderer/components/Button/Button";
import { Link } from "react-router-dom";
import IconButton from "~renderer/components/IconButton/IconButton";
import { mdiWheelchairAccessibility } from "@mdi/js";
import { mdiEarth } from "@mdi/js";
import AccessibilityIconWrapper from "~root/renderer/components/AccessibilityIconWrapper/AccessibilityIconWrapper";
import { isDisabledGlobal } from "~renderer/stores/globalStore/globalStore";
import { useState } from "@hookstate/core";

const HomePage: FC = (): JSX.Element => {
  const isDisabled = useState(isDisabledGlobal);
  return (
    <>
      <Logo />
      <Link to="/scan">
        <Button text="Zapraszamy" />
      </Link>
      <AccessibilityIconWrapper>
        <IconButton icon={mdiEarth} alt="Wybierz język" />
        <IconButton
          icon={mdiWheelchairAccessibility}
          alt="Włącz tryb dla niepełnosprawnych"
          onClick={() => {
            isDisabled.set((previousState: boolean): boolean => {
              return !previousState;
            });
          }}
        />
      </AccessibilityIconWrapper>
    </>
  );
};

export default memo(HomePage);
