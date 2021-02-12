import React from 'react';

interface ModalProps {
  title: string;
  actions?: JSX.Element;
  open: boolean;
  setModalOpen: (state: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ open, title, setModalOpen, children, actions }) => {
  return (
    <div
      className={`flex items-center justify-center fixed w-full h-full top-0 left-0 bg-gray-600 bg-opacity-50 ${
        open ? 'visible' : 'invisible'
      }`}
      onClick={(e) => {
        setModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-lg w-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full ">
            <div className="text-gray-900 font-medium text-lg">{title}</div>
          </div>
          <hr />
          <div className="w-full">{children}</div>
          <hr />
          <div className="ml-auto">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
