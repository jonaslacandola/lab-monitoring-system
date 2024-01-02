import { useEffect } from "react";

export function useOutsideClick(refElement, handleClickOutside) {
  useEffect(
    function () {
      function handleClick(e) {
        if (refElement.current && !refElement.current.contains(e.target)) {
          handleClickOutside?.();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [refElement, handleClickOutside]
  );
}
