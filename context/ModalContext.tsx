import React, { createContext, ReactNode, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface Modal {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const ModalContext = createContext<Modal>({} as Modal);

export function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
