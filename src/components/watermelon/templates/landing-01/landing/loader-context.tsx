"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LoaderContextValue = {
  overlayOpen: boolean;
  markReady: boolean;
  setOverlayOpen: (open: boolean) => void;
  setMarkReady: (ready: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue>({
  overlayOpen: false,
  markReady: false,
  setOverlayOpen: () => {},
  setMarkReady: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [markReady, setMarkReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("nthtake-loader")) {
      setMarkReady(true);
    }
  }, []);
  const value = useMemo(
    () => ({ overlayOpen, markReady, setOverlayOpen, setMarkReady }),
    [overlayOpen, markReady],
  );
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoaderGate() {
  return useContext(LoaderContext);
}
