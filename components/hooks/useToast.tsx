import { useUIContext } from "@/components/context/uiContext";
import type { ToastType } from "@/types/ui";
import { useEffect, useCallback, memo } from "react";

const useToast: () => [
  ToastType[],
  (toast: ToastType) => void,
  (index: number) => void,
] = () => {
  const { UI, setUI } = useUIContext();

  /**
   * wrap in callback to only re-render when toasts change
   */
  const addToast: (toast: ToastType) => void = useCallback(({
    message = '',
    style = 'success',
    title = style
  }) => {
    setUI({
      ...UI,
      toasts: [
        ...UI.toasts,
        {
          title: title,
          message: message,
          style: style,
        }
      ]
    });
  }, [ UI.toasts ]);

  /**
   * wrap in callback to only re-render when toasts change
   */
  const removeToast = useCallback((index: number) => {
    const arrCopy = [...UI.toasts];
    arrCopy.splice(index, 1);

    setUI({
      ...UI,
      toasts: arrCopy
    });
  }, [ UI.toasts ])

  // useEffect(() => {
  //   console.log(UI.toasts)
  // }, [ UI.toasts ])

  return [ UI.toasts, addToast, removeToast ];
}

export default useToast;