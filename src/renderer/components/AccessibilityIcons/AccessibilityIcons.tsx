import { isDisabledGlobal } from "~renderer/stores/globalStore/globalStore";
import AccessibilityIconWrapper from "~renderer/components/AccessibilityIconsWrapper/AccessibilityIconsWrapper";
import IconButton from "~renderer/components/IconButton/IconButton";
import {
  mdiWheelchairAccessibility,
  mdiInformationOutline,
  mdiEarth,
} from "@mdi/js";
import { useState } from "@hookstate/core";

const AccessibilityIcons = () => {
  const isDisabled = useState(isDisabledGlobal);
  return (
    <AccessibilityIconWrapper>
      <IconButton icon={mdiInformationOutline} alt="Więcej informacji" />
      <IconButton icon={mdiEarth} alt="Wybierz język" />
      <IconButton
        icon={mdiWheelchairAccessibility}
        alt={`${
          isDisabled.get() ? "Wyłącz" : "Włącz"
        } tryb dla niepełnosprawnych`}
        onClick={() => {
          isDisabled.set((previousState: boolean): boolean => {
            return !previousState;
          });
          const speaker = new SpeechSynthesisUtterance(
            `${
              isDisabled.get() ? "Włączono" : "Wyłączono"
            } tryb dla niepełnosprawnych`,
          );
          window.speechSynthesis.speak(speaker);
        }}
      />
    </AccessibilityIconWrapper>
  );
};

export default AccessibilityIcons;
