import { useEffect } from "react";

const Modal = ({ children, success }) => {
  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);

  const closeModal = () => {
    const modal = document.getElementById("modal");

    modal.classList.remove("opacity-100", "pointer-events-auto");
    modal.classList.add("opacity-0", "pointer-events-none");
  };

  return (
    <div
      id="modal"
      className="modal absolute overflow-x-hidden w-screen h-screen opacity-0 transition-all duration-500 ease-out pointer-events-none z-50"
    >
      <div
        id="overlay"
        className="overlay bg-black opacity-45 w-screen h-screen absolute z-0 transition-all duration-500 ease-out"
        onClick={closeModal}
      ></div>
      <div className="flex justify-center items-center h-full w-full">
        <div className="modal-container w-96 min-h-80 absolute z-10 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
