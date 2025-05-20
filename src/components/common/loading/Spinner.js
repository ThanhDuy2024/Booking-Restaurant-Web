import { useEffect, useState } from 'react';
import { PacmanLoader, ClipLoader, BeatLoader } from 'react-spinners';

const spinnerComponents = {
  PacmanLoader,
  ClipLoader,
  BeatLoader,
};

const Spinner = ({ type = 'ClipLoader', color = '#facc15', size = 40, delay = 2000 }) => {
  const [visible, setVisible] = useState(false);
  const SpinnerComponent = spinnerComponents[type] || ClipLoader;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <SpinnerComponent color={color} size={size} />
    </div>
  );
};

export default Spinner;

//<Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />