import { createContext, useCallback, useRef, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

export const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const show = useCallback((msg) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region no-print" role="status" aria-live="polite">
        {message && (
          <div className="toast">
            <BsCheckCircleFill aria-hidden="true" /> {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
