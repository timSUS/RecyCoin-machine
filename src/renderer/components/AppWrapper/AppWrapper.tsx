import { FC, memo, ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import useErrorBoundary, { UseErrorBoundaryState } from "use-error-boundary";
import HomePage from "~renderer/pages/HomePage/HomePage";
import GlobalStyle from "~renderer/components/GlobalStyle/GlobalStyle";
import ScanPage from "~renderer/pages/ScanPage/ScanPage";
import AccessibilityIcons from "../AccessibilityIcons/AccessibilityIcons";
import MainWrapper from "../MainWrapper/MainWrapper";
import Logo from "~renderer/components/Logo/Logo";
import ThrowPage from "~root/renderer/pages/ThrowPage/ThrowPage";
import ReadyPage from "~root/renderer/pages/ReadyPage/ReadyPage";

const AppWrapper: FC = (): JSX.Element => {
  const { ErrorBoundary, didCatch }: UseErrorBoundaryState = useErrorBoundary();
  return (
    <>
      <GlobalStyle />
      {didCatch ? (
        <></>
      ) : (
        <ErrorBoundary>
          <Logo />
          <MainWrapper>
            <Switch>
              <Route exact sensitive path="/" component={HomePage} />
              <Route exact sensitive path="/scan" component={ScanPage} />
              <Route exact sensitive path="/throw" component={ThrowPage} />
              <Route exact sensitive path="/ready" component={ReadyPage} />
              <Route render={(): ReactElement => <Redirect to="/" />} />
            </Switch>
          </MainWrapper>
          <AccessibilityIcons />
        </ErrorBoundary>
      )}
    </>
  );
};

export default memo(AppWrapper);
