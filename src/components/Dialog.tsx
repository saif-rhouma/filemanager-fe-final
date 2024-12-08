import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/Dialog.css';

const Dialog = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box card" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
export default Dialog;
