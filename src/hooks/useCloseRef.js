import { useEffect, useRef } from "react";

export function useCloseRef(eventClose, handleListinEvent = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        eventClose();
      }
    }

    document.addEventListener("click", handleClose, handleListinEvent);

    return () =>
      document.removeEventListener("click", handleClose, handleListinEvent);
  }, [eventClose, handleListinEvent]);

  return { ref };
}
