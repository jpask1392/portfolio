import { createPortal } from 'react-dom';

// cast the component outside the parent container
const FlyoutPortal = ({ children } : { children: any }) => {
  return createPortal( children, document.body );
}

export default FlyoutPortal;