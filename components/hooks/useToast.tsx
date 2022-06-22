import { useUIContext } from "@/components/context/uiContext";
import type { ToastType } from "@/types/ui";

const useToast: () => [
  ToastType[],
  (toast: ToastType) => void,
  (index: number) => void,
] = () => {
  const { UI, setUI } = useUIContext();

  const addToast: (toast: ToastType) => void = ({
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
  }

  const removeToast = (index: number) => {
    const arrCopy = [...UI.toasts];
    arrCopy.splice(index, 1);

    setUI({
      ...UI,
      toasts: arrCopy
    });
  }

  return [ UI.toasts, addToast, removeToast ];
}

export default useToast;