import React, { createContext, useContext, useState, useCallback } from "react";

interface ExperimentContextType {
  variant: string | null;
  setVariant: (variant: string) => void;
}

const ExperimentContext = createContext<ExperimentContextType | undefined>(
  undefined,
);

export function ExperimentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [variant, setVariant] = useState<string | null>(null);

  const updateVariant = useCallback((newVariant: string) => {
    setVariant(newVariant);
  }, []);

  return (
    <ExperimentContext.Provider
      value={{
        variant,
        setVariant: updateVariant,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperimentVariant() {
  const context = useContext(ExperimentContext);
  if (context === undefined) {
    throw new Error(
      "useExperimentVariant deve ser usado dentro de ExperimentProvider",
    );
  }
  return context;
}
