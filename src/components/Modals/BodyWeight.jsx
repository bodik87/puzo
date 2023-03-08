import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BODY_WEIGHT, EDIT } from "../../assets/CONSTANTS";
import { updateWeight } from "../../store/weightSlice";

export default function BodyWeight({ openedBodyWeight, setOpenedBodyWeight }) {
  const dispatch = useDispatch();
  const weight = useSelector((state) => state.weight);
  const [value, setValue] = useState(weight);

  function closeModal() {
    dispatch(updateWeight(Number(value)));
    setOpenedBodyWeight(false);
  }

  return (
    <>
      <Transition appear show={openedBodyWeight} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-5 left-0 right-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                  <Dialog.Title as="h3" className="modalTitle">
                    {BODY_WEIGHT}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mb-6">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        step={0.1}
                        placeholder={BODY_WEIGHT}
                        className="input p-4 text-2xl"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn bg-blue-700 hover:bg-blue-800"
                      onClick={closeModal}
                    >
                      {EDIT}
                    </button>
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
