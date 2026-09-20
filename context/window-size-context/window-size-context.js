import { createContext, useContext } from 'react';
import useWindowSizeHook from '@/hooks/useWindowSize';

const WindowSizeContext = createContext();

export const useWindowSize = () => {
  return useContext(WindowSizeContext);
};

export const WindowSizeProvider = ({ children }) => {
  const windowSizeData = useWindowSizeHook();
  return (
    <WindowSizeContext.Provider value={windowSizeData}>
      {children}
    </WindowSizeContext.Provider>
  );
};
