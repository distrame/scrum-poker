import { useCallback, useEffect } from "react";

export function useVisibilityChange({ onVisible }: { onVisible: () => void }) {
  const callback = useCallback(() => {
    if (document.visibilityState === "visible") {
      onVisible();
    }
  }, [onVisible]);

  useEffect(() => {
    document.addEventListener("visibilitychange", callback);
    return () => {
      document.removeEventListener("visibilitychange", callback);
    };
  }, [callback]);
}
