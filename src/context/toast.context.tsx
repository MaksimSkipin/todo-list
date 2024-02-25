import React, { createContext, useContext, useState } from "react";
import AppNotification from "../components/_common/AppNotification/AppNotification";

type TVariant = "error" | "success";
interface IToastData {
  msg: string;
  variant: TVariant;
}

const initToastData: IToastData = {
  msg: "",
  variant: "success",
};

type TShowToast = (msg: string, variant?: TVariant) => void;

export interface ITodosContextType {
  showToast: TShowToast;
}

const initContextState: ITodosContextType = {
  showToast: () => {},
};

const ToastContext = createContext(initContextState);

export const ToastContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toastData, setToastData] = useState<IToastData>(initToastData);

  const showToast: TShowToast = (msg, variant = "success") => {
    setToastData({ msg, variant });

    setTimeout(() => setToastData(initToastData), 1000);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <AppNotification msg={toastData.msg} variant={toastData.variant} isToast />

      {children}
    </ToastContext.Provider>
  );
};

export default function useToastContext() {
  return useContext(ToastContext);
}
