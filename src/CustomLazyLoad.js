import React, { memo, lazy, Suspense } from 'react'

// components
import LoadingBar from "./components/LoadingBar";
import ErrorBoundary from "./HOCs/withErrorBoundary/ErrorBoundary";

/*
  NOTE: path MUST be relative to this file
*/

export const lazyLoadRoute = path => props => {

  const LazyComponent = lazy(() => import(`${path}`));

  return (
    <Suspense fallback={<LoadingBar />}>
      <ErrorBoundary>
        <LazyComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

export function lazyLoadComponent(path, is_show_loading_text = true){
  const LazyComponent = lazy(() => import(`${path}`));

  function LazyComponentWrapper(props){
    return (
      <Suspense fallback={<LoadingBar is_show_loading_text={is_show_loading_text} />}>
        <ErrorBoundary>
          <LazyComponent {...props} />
        </ErrorBoundary>
      </Suspense>
    );
  }

  return memo(LazyComponentWrapper);
}