import React, { memo, lazy, Suspense } from "react";

// components
import LoadingBar from "./components/LoadingBar";
import ErrorBoundary from "./HOCs/withErrorBoundary/ErrorBoundary";

export const lazyLoadRoute = lazy_load_function  => props => {
  const LazyComponent = lazy(lazy_load_function);

  return (
    <Suspense fallback={<LoadingBar />}>
      <ErrorBoundary>
        <LazyComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

export function lazyLoadComponent(lazy_load_function, is_show_loading_text = true) {
  const LazyComponent = lazy(lazy_load_function);

  function LazyComponentWrapper(props) {
    return (
      <Suspense
        fallback={<LoadingBar is_show_loading_text={is_show_loading_text} />}
      >
        <ErrorBoundary>
          <LazyComponent {...props} />
        </ErrorBoundary>
      </Suspense>
    );
  }

  return memo(LazyComponentWrapper);
}
