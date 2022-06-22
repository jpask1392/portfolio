import Container from '../Container';
import Toast from './Toast';
import type { ToastType } from "@/types/ui";

import useToast from "@/components/hooks/useToast";

interface Props {
  style?: string | 'success' | 'error' | 'warning'
}

const Toasts: React.FC<Props> = () => {
  const [ toasts ] = useToast();

  return (
    toasts.length ? (
      <div className="fixed bottom-6 z-50 w-full md:pl-16 xl:pl-24">
      <Container
        clearMargin={['top', 'bottom']} 
        backgroundColor="transparent"
        clearPadding={['top', 'bottom']}
      >
        <ul>
        {
          toasts.map((toast: ToastType, i: number) => {
            return (
              <li key={i}>
                <Toast
                  style={toast.style}
                  message={toast.message}
                  title={toast.title}
                  index={i}
                />
              </li>
            )
          })
        }
        </ul>
        
      </Container>
    </div>
    ) : null
  )
}

export default Toasts;