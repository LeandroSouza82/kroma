import { useEffect, useRef } from "react";

// Compartilha abertura, bloqueio de rolagem e retorno de foco dos diálogos.
export default function useNativeDialog() {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const anterior = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = overflow;
      if (anterior?.isConnected) anterior.focus({ preventScroll: true });
    };
  }, []);

  return { dialogRef, closeRef };
}
