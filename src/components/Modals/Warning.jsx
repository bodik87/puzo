import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { AGREE, CANCEL_STEP, WARNING } from "../../assets/CONSTANTS";

export default function Warning({
  openedWarning,
  setOpenedWarning,
  setOpenedNewProduct,
  hasOptions = true,
  children,
}) {
  function closeModals() {
    setOpenedWarning(false);
    setOpenedNewProduct(false);
  }
  function closeModal() {
    setOpenedWarning(false);
  }

  return (
    <>
      <Transition appear show={openedWarning} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed top-16 max-w-md mx-auto left-0 right-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                  <Dialog.Title
                    as="h3"
                    className="modalTitle flex justify-center items-center text-red-500"
                  >
                    {WARNING}
                  </Dialog.Title>

                  <div className="mt-2 w-full text-center">{children}</div>

                  <div className="flex items-center justify-center gap-2">
                    {hasOptions && (
                      <div className="w-1/2 mt-6 flex justify-center">
                        <button
                          type="button"
                          className="btn bg-black/80 hover:bg-black/70 flex flex-nowrap text-sm md:text-base"
                          onClick={closeModal}
                        >
                          <ArrowLeftIcon className="h-4 w-4 mr-2 -ml-3" />
                          {CANCEL_STEP}
                        </button>
                      </div>
                    )}
                    <div className="w-1/2 mt-6 flex justify-center">
                      <button
                        type="button"
                        className="btn bg-red-500 hover:bg-red-500/90 active:hover:bg-red-800 text-sm md:text-base"
                        onClick={closeModals}
                      >
                        {AGREE}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
