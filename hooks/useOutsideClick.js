import { useEffect } from "react";

const useOutsideClick = (ref, setPopupState) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the clicked target is not within the modal, close it
      if (ref.current && !ref.current.contains(event.target)) {
        setPopupState(false); // Close the popup
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setPopupState]);
};

export default useOutsideClick