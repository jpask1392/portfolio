import cn from 'classnames'
import ReactModal from 'react-modal';

interface Props {
  children: any
  contentClassNames?: string
  setModalIsOpen: any
  modalIsOpen: boolean
}

const Modal: React.FC<Props> = ({
  children,
  contentClassNames,
  setModalIsOpen,
  modalIsOpen,
}) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      overlayClassName="fixed inset-0 z-50 flex items-start justify-end bg-white bg-opacity-60 backdrop-blur-sm overflow-scroll"
      className="my-auto w-full"
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <button 
        onClick={() => setModalIsOpen(false)}
        className="absolute top-10 right-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="51"
          viewBox="0 0 52 51"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.44615 1.82094C2.24499 1.0221 3.54017 1.0221 4.33901 1.82094L49.1783 46.6603C49.9772 47.4591 49.9772 48.7543 49.1783 49.5531C48.3795 50.352 47.0843 50.352 46.2855 49.5531L1.44615 4.7138C0.647307 3.91496 0.647307 2.61978 1.44615 1.82094Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.29409 49.5531C1.49525 48.7543 1.49524 47.4591 2.29409 46.6603L47.1334 1.82094C47.9322 1.0221 49.2274 1.0221 50.0263 1.82094C50.8251 2.61978 50.8251 3.91496 50.0263 4.7138L5.18695 49.5531C4.3881 50.352 3.09293 50.352 2.29409 49.5531Z"
            fill="white"
          />
        </svg>
      </button>

      <div className={cn(contentClassNames, "py-10 w-full max-w-[100vw]")}>
        { children }
      </div>
    </ReactModal>
  )
}

export default Modal;