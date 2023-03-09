import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { ADD_AGAIN, DELETE, EDIT } from "../../assets/CONSTANTS";

export default function Popup({
  openedPopup,
  setOpenedPopup,
  mealId,
  dishTitle,
}) {
  // function closeModals() {
  //   setOpenedWarning(false);
  //   setOpenedNewProduct(false);
  // }

  const meals = useSelector((state) => state.meals);
  function closeModal() {
    setOpenedPopup(false);
  }

  return (
    <>
      <Transition appear show={openedPopup} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  <Dialog.Title as="h3" className="modalTitle">
                    {dishTitle}
                  </Dialog.Title>

                  <div className="flex flex-col justify-center gap-2">
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="btn bg-green-600 hover:bg-green-600/90 active:hover:bg-green-800 text-base md:text-base py-5"
                        onClick={closeModal}
                      >
                        {ADD_AGAIN}
                      </button>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="btn bg-red-500 hover:bg-red-500/90 flex flex-nowrap text-base md:text-base py-5"
                        onClick={closeModal}
                      >
                        {DELETE}
                      </button>
                      <button
                        type="button"
                        className="btn bg-yellow-500 hover:bg-yellow-500/90 active:hover:bg-yellow-800 text-base py-5"
                        onClick={closeModal}
                      >
                        {EDIT}
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
