// import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';

export default function MintingModal({ open, setOpen }) {
  return (
    // <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      open={open}
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={setOpen}
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            å
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
        <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-500/75 transition-opacity" />
        {/* </Transition.Child> */}

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        
        {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          > */}
        <div className="font-body relative z-30 inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Minting not active
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Minting is not currently active. Please try again later.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="btn-light-blue font-heading mx-auto mt-4 flex h-12 w-64 items-center justify-center text-base md:w-4/5"
              onClick={() => setOpen(false)}
            >
              Back to site
            </button>
          </div>
        </div>
        {/* </Transition.Child> */}
      </div>
    </Dialog>
    // </Transition.Root>
  );
}
