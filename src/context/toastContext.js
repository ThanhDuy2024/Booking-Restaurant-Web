import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const toastIds = [];

  const showToast = (message, options = {}) => {
    const defaultOptions = {
      position: 'top-right',
      type: 'success',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (toastIds.length >= 3) {
      const oldestToastId = toastIds.shift();
      if (oldestToastId) {
        toast.dismiss(oldestToastId);
      }
    }

    const newToastId = toast(message, { ...defaultOptions, ...options });
    toastIds.push(newToastId);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer limit={3} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
