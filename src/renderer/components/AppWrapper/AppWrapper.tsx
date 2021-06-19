import { FC, memo, ReactElement, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import useErrorBoundary, { UseErrorBoundaryState } from "use-error-boundary";
import HomePage from "~renderer/pages/HomePage/HomePage";
import GlobalStyle from "~renderer/components/GlobalStyle/GlobalStyle";
import ScanPage from "~renderer/pages/ScanPage/ScanPage";

const AppWrapper: FC = (): JSX.Element => {
  const { ErrorBoundary, didCatch }: UseErrorBoundaryState = useErrorBoundary();
  return (
    <>
      <GlobalStyle />
      {didCatch ? (
        <></>
      ) : (
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Switch>
              <Route exact sensitive path="/" component={HomePage} />
              <Route exact sensitive path="/scan" component={ScanPage} />
              <Route render={(): ReactElement => <Redirect to="/" />} />
              ScanPage
            </Switch>
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default memo(AppWrapper);
