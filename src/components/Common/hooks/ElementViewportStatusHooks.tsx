import { useEffect, useState } from "react";

export function useElementViewportStatus(
  ref: React.RefObject<HTMLElement | null>,
  offset = 0
) {
  const [status, setStatus] = useState({
    isVisible: false,
    isAboveViewport: false,
    isBelowViewport: false,
  });

  useEffect(() => {
    function checkPosition() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      const isVisible =
        rect.bottom - offset > 0 && rect.top + offset < vHeight;
      const isAboveViewport = rect.bottom <= 0;
      const isBelowViewport = rect.top >= vHeight;

      setStatus({ isVisible, isAboveViewport, isBelowViewport });
    }

    checkPosition();
    window.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [ref, offset]);

  return status;
}