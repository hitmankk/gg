import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SharedStateContextType {
  counter: number;
  updateCounter: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

interface SharedStateProviderProps {
  children: ReactNode; // Add children prop
}

export const SharedStateProvider: React.FC<SharedStateProviderProps> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const updateCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <SharedStateContext.Provider value={{ counter, updateCounter }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
