import React, { useEffect, useRef } from "react";
import "./Modal.css";

function Modal({ openModal, closeModal, children, articleContent }) {
  const ref = useRef();
  console.log(articleContent);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className="modal" ref={ref} onCancel={closeModal}>
      {children}
      <button className="close-button" onClick={closeModal}>
        x
      </button>
    </dialog>
  );
}

export default Modal;
